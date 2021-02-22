import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DefaultRikishi, Match, Rikishi, DisplayMatch } from '../models/rikishi';
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
  saving: boolean = false;
  curSelected: string = "";
  teamLoaded: boolean = false;
  rikishiLoaded: boolean = false;
  lastDay: number = 0;

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

  constructor(private rikishiService: RikishiService) { 
    console.log(`test:${this.saving}`);
  }

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
    this.determineIfChanged()
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
    this.saving = true;
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
      this.saving = false;
    })
  }

  determineIfChanged(): boolean {
    var lastDay:number = 0;
    var dif:boolean = false;
    this.team.forEach((value: selectedRikishi, key: string) => {
      var curSelected = this.selected.get(key) ?? <selectedRikishi>{}
      if(curSelected.rikishi?.ID !== value.rikishi?.ID) {
        dif = true;
        console.log("determineIfChanged: DIF: selected:", curSelected.rikishi)
        console.log("determineIfChanged: DIF: team:", value.rikishi)
      }
      var curRikishi = curSelected.rikishi
      if(curRikishi !== undefined) {
        curRikishi.Matches.forEach((match: Match, key: number) => {
          console.log("match.Day", match.Day)
          if(lastDay < match.Day) {
            lastDay = match.Day
          }
        });
      }
    })
    this.lastDay = lastDay;
    this.setupDisplayMatches()
    this.changed = dif;
    return dif;
  }

  lastDayArray(): Array<number> {
    var arr = new Array<number>(Math.min(3,this.lastDay))
    var j = Math.min(this.lastDay-1,2)
    for(var i=0;i<Math.min(this.lastDay,3);i++) {
      arr[i] = this.lastDay - j;
      j--
    }
    return arr
  }

  setupDisplayMatches(): void {
    
    if(this.lastDay === 0) {return}

    this.team.forEach((value: selectedRikishi, key: string) => {
      var curSelected = this.selected.get(key) ?? <selectedRikishi>{}
      var curRikishi = curSelected.rikishi
      if(curRikishi !== undefined ) {
        curRikishi.DisplayMatches = new Array<DisplayMatch>()
        console.log("setupDisplayMatches",curRikishi.DisplayMatches)
        var j = this.lastDay;
        for (var i = Math.min(2,this.lastDay-1); i >= 0; i--) {
          if(j > 0) {
            
            var curMatch = curRikishi.Matches.get(j)
            
            if(curMatch != undefined) {
              curRikishi.DisplayMatches[i] = <DisplayMatch>({
                Display: true,
                Day: curMatch.Day,
                Opponent: this.rikishiService.getRikishiByKey(curMatch.Opponent),
                Concluded: curMatch.Concluded,
                Won: curMatch.Won
              })
            } else {
              curRikishi.DisplayMatches[i] = <DisplayMatch>({Display: false})
            }
            console.log("setupDisplayMatches",i,j,curMatch,curRikishi.DisplayMatches)
            j--;
          }
        }
      }
    })
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