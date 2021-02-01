import { Component, OnInit } from '@angular/core';
import { DefaultRikishi, Rikishi } from '../rikishi';
import { RikishiService } from '../rikishi.service';

@Component({
  selector: 'pick-selector',
  templateUrl: './pick-selector.component.html',
  styleUrls: ['./pick-selector.component.css']
})
export class PickSelectorComponent implements OnInit {
  curSelected: string = "";

  selected: Map<string,Rikishi> = new Map([
    ["A", DefaultRikishi],
    ["B", DefaultRikishi],
    ["C", DefaultRikishi],
    ["D", DefaultRikishi],
    ["E", DefaultRikishi]
  ]);

  rikishis: Map<string,Rikishi[]> = new Map();

  constructor(private rikishiService: RikishiService) { }

  ngOnInit(): void {
    this.rikishis = this.rikishiService.getRikishi();
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
    console.log(`Select Rikishi`);
    this.selected.set(this.curSelected, rikishi);
    this.curSelected="";
  }
}