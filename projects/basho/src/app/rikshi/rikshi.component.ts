import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rikshi',
  templateUrl: './rikshi.component.html',
  styleUrls: ['./rikshi.component.css']
})
export class RikshiComponent implements OnInit {
  @Input() name = 'Default Rikshi';

  constructor() { }

  ngOnInit(): void {
  }

}
