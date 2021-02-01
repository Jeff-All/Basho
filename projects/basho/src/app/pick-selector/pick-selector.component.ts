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
    ["B", DefaultRikishi],
    ["C", DefaultRikishi],
    ["D", DefaultRikishi],
    ["E", DefaultRikishi]
  ]);

  rikishis: Map<string,Rikishi[]> = new Map([
    ["A",[
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi A", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi B", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi C", rank:"Ozeki" }
    ]],
    ["B",[
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi D", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi E", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi F", rank:"Ozeki" }
    ]],
    ["C",[
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi G", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi H", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi I", rank:"Ozeki" }
    ]],
    ["D",[
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi J", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi K", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi L", rank:"Ozeki" }
    ]],
    ["E",[
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi M", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi N", rank:"Ozeki" },
      { filled: true, avatar:'/assets/default_avatar.jpg', name:"Rikishi O", rank:"Ozeki" }
    ]]
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(category: string): void {
    console.log(`Selected Category ${category}`);
    this.curSelected = category;
  }

}
