import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rikshi',
  templateUrl: './rikshi.component.html',
  styleUrls: ['./rikshi.component.css']
})
export class RikshiComponent implements OnInit {
  @Input() name = 'Default Rikshi';
  @Input() avatar = '/assets/default_avatar.jpg';
  @Input() rank = 'Ozeki';

  constructor() { }

  ngOnInit(): void {
  }

}
