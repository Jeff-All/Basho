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
  curSelected: string = "";

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
      console.log("team returned:", rikishis)
      rikishis.forEach((value: Rikishi, key: string) => {
        console.log(`team(${{key}}):`,value)
        var cur = this.selected.get(key) ?? <selectedRikishi>{}
        cur.rikishi = value
      })
    })
    this.rikishiService.getCategorizedRikishi()
    .subscribe(rikishis => {
      console.log("rikishis returned:", rikishis)
      this.rikishis = rikishis})
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
  }
}