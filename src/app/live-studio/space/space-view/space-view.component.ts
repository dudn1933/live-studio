import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-view',
  templateUrl: './space-view.component.html',
  styleUrls: ['./space-view.component.scss']
})
export class SpaceViewComponent implements OnInit {
  @Input() waveData:any;
  @Input() spaceIndex:any;

  constructor() { }

  ngOnInit(): void {}
}
