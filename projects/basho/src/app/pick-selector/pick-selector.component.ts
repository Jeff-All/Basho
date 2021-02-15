import { Component, OnInit } from '@angular/core';
import { DefaultRikishi, Rikishi } from '../models/rikishi';
import { RikishiService } from '../services/rikishi.service';

interface selectedRikishi {
  rikishi?: Rikishi
}

@Component({
  selector: 'pick-selector',
  templateUrl: './pick-selector.component.html',
  styleUrls: ['./pick-selector.component.css']
})

export class PickSelectorComponent implements OnInit {
  ready: boolean = false;
  changed: boolean = false;
  curSelected: string = "";
  teamLoaded: boolean = false;
  rikishiLoaded: boolean = false;

  team: Map<string,selectedRikishi> = new Map([
    ["A", <selectedRikishi>({})],
    ["B", <selectedRikishi>({})],
    ["C", <selectedRikishi>({})],
    ["D", <selectedRikishi>({})],
    ["E", <selectedRikishi>({})]
  ]);

  selected: Map<string,selectedRikishi> = new Map([
    ["A", <selectedRikishi>({})],
    ["B", <selectedRikishi>({})],
    ["C", <selectedRikishi>({})],
    ["D", <selectedRikishi>({})],
    ["E", <selectedRikishi>({})]
  ]);

  rikishis: Map<string,Rikishi[]> = new Map<string,Rikishi[]>()

  constructor(private rikishiService: RikishiService) { }

  ngOnInit(): void {
    this.rikishiService.getTeam()
    .subscribe(rikishis => {
      console.log("team returned:", rikishis);
      rikishis.forEach((value: Rikishi, key: string) => {
        console.log(`team(${{key}}):`,value);
        var curTeam = this.team.get(key) ?? <selectedRikishi>{};
        var curSelected = this.selected.get(key) ?? <selectedRikishi>{};
        curTeam.rikishi = value;
        curSelected.rikishi = value;
      })
      this.teamLoaded = true;
      this.determineWaiting();
    })
    this.rikishiService.getCategorizedRikishi()
    .subscribe(rikishis => {
      
      console.log("rikishis returned:", rikishis)
      this.rikishis = rikishis;
      this.rikishiLoaded = true;
      this.determineWaiting();
    })
  }

  determineWaiting() {
    if(this.rikishiLoaded && this.teamLoaded) {
      this.ready = true;
    }
    console.log(`determineWaiting(rikishi=${this.rikishiLoaded},team=${this.teamLoaded}):`,this.ready)
  }

  resetTeam(): void {
    this.team.forEach((value: selectedRikishi, key: string) => {
      var cur :any = this.selected.get(key);
      if(cur === undefined) {
        throw new Error(`unable to update team, rikishi in category ${key} was undefined`);
      }
      cur.rikishi = value.rikishi
      this.determineIfChanged();
    });
  }

  saveTeam(): void {
    this.ready = false;
    var map: Map<string,Rikishi> = new Map<string,Rikishi>();
    this.selected.forEach((value: selectedRikishi, key: string) => {
      if(value.rikishi === undefined) {
        throw new Error(`unable to save, rikishi in category ${key} was undefined`);
      }
      var cur: Rikishi = value.rikishi ?? <Rikishi>{};
      map.set(key,cur)
    })
    this.rikishiService.saveTeam(map)
    .subscribe(bool => {
      console.log("team saved:", bool);
      this.selected.forEach((value: selectedRikishi, key: string) => {
        var cur :any = this.team.get(key);
        if(cur === undefined) {
          throw new Error(`unable to update team, rikishi in category ${key} was undefined`);
        }
        cur.rikishi = value.rikishi
      });
      this.determineIfChanged();
      this.ready = true;
    })
  }

  determineIfChanged(): boolean {
    var dif:boolean = false;
    this.team.forEach((value: selectedRikishi, key: string) => {
      var curSelected = this.selected.get(key) ?? <selectedRikishi>{}
      if(curSelected.rikishi?.ID !== value.rikishi?.ID) {
        dif = true;
        console.log("determineIfChanged: DIF: selected:", curSelected.rikishi)
        console.log("determineIfChanged: DIF: team:", value.rikishi)
      }
    })
    this.changed = dif;
    return dif;
  }

  selectCategory(category: string): void {
    console.log(`Selected Category ${category}`);
    if(this.curSelected != category) {
      this.curSelected = category;
    } else {
      this.curSelected = "";
    }
  }

  selectRikishi(rikishi: Rikishi): void {
    console.log(`Select Rikishi ${typeof rikishi}`, rikishi, this.selected.get(this.curSelected));
    var selected = this.selected.get(this.curSelected)
    selected!.rikishi = rikishi
    this.curSelected="";
    this.determineIfChanged()
  }
}