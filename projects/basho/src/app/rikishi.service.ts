import { Injectable } from '@angular/core';
import { Rikishi } from './rikishi';

@Injectable({
  providedIn: 'root'
})
export class RikishiService {

  constructor() { }

  getRikishi(): Map<string,Rikishi[]> {
    return new Map([
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
  }
}
