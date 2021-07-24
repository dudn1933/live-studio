import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.scss']
})
export class WaveformComponent implements OnInit {
  @Input() waveData:any;
  @Input() spaceIndex:any;

  constructor() { }

  ngOnInit(): void {
  }

}
