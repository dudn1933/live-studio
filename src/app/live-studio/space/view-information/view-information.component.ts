import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.scss']
})
export class ViewInformationComponent implements OnInit {
  @Input() spaceIndex:any;
  constructor() { }

  ngOnInit(): void {
  }

}
