import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {

  statusType: number[] = [0,1,2,3];

  constructor() { }

  ngOnInit(): void {
  }

}
