import { Component, OnInit } from '@angular/core';
import { DefaultRikishi, Rikishi } from '../rikishi';

@Component({
  selector: 'pick-selector',
  templateUrl: './pick-selector.component.html',
  styleUrls: ['./pick-selector.component.css']
})
export class PickSelectorComponent implements OnInit {
  curSelected: string = "";

  selected: Map<string,Rikishi> = new Map([
    ["A", DefaultRikishi],
    ["B", { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi A", rank:"Ozeki" }],
    ["C", { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi A", rank:"Ozeki" }],
    ["D", DefaultRikishi],
    ["E", DefaultRikishi]
  ]);

  rikishis: Rikishi[] = [
    { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi A", rank:"Ozeki" },
    { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi B", rank:"Ozeki" },
    { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi C", rank:"Ozeki" },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(category: string): void {
    console.log(`Selected Category ${category}`);
    this.curSelected = category;
  }

}
