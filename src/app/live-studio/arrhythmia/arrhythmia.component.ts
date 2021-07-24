import { Component, OnInit } from '@angular/core';
import { LiveStudioService } from '../live-studio-service/live-studio.service';
import { LiveStudio } from '../live-studio.model';

@Component({
  selector: 'app-arrhythmia',
  templateUrl: './arrhythmia.component.html',
  styleUrls: ['./arrhythmia.component.scss']
})
export class ArrhythmiaComponent implements OnInit {
  arrhythmiaList: any[] = [];
  spaceIndex: any;

  constructor(private arrhythmia:LiveStudioService) { }

  ngOnInit(): void {
    this.arrhythmia.test.subscribe((res: any) => {
      if (res.data.arrhythmiaList !== undefined) {
        this.spaceIndex = res.spaceIndex;
        if (this.arrhythmiaList.length !== 0) {
          while (this.arrhythmiaList.length !== 0) {
            this.arrhythmiaList.shift();
          }
        }
        this.arrhythmiaList.push(...res.data.arrhythmiaList);
      }
    })
  }

  getColor(value: any) {
    switch (value) {
      case "normal":
        return 'green'
      case "asystole":
        return 'white'
      case "ventricular fibrillation":
        return 'white'
      case "premature ventricular contraction":
        return 'white'
      case "ventricular tachycardia":
        return'white'
      case "ventricular bigemin":
        return 'white'
      case "ventricular trigemini":
        return 'white'
      case "ventricular couple":
        return 'white'
      case "sinus bradycardia":
        return 'white'
      case "atrial tachycardia":
        return 'white'
      case "supraventricular tachycardia":
        return 'white'
      case "paced rhythm":
        return 'white'
      case "atrial fibrillation":
        return 'red'
      case "atrial flutter":
        return 'white'
      case "atrial premature contraction":
        return 'white'
      case "ventricular Triplet":
        return 'white'
      case "sinus tachycardia":
        return 'white'
      case "in progress/overange":
        return 'white'
      case "Unknown":
        return 'white'
      default:
        return alert('The type of annotation does not exist.');
    }
  }

  getAnnotation(value: any) {
    switch (value) {
      case 0:
        return "normal"
      case 1:
        return "asystole"
      case 2:
        return "ventricular fibrillation"
      case 3:
        return "premature ventricular contraction"
      case 4: 
        return "ventricular tachycardia"
      case 5:
        return " ventricular bigemin"
      case 6:
        return "ventricular trigemini"
      case 7:
        return "ventricular couple"
      case 8:
        return "sinus bradycardia"
      case 9:
        return "atrial tachycardia"
      case 10:
        return "supraventricular tachycardia"
      case 11:
        return "paced rhythm"
      case 12:
        return "atrial fibrillation"
      case 13:
        return " atrial flutter"
      case 14:
        return "atrial premature contraction"
      case 15:
        return "ventricular Triplet"
      case 16:
        return "sinus tachycardia"
      case 99:
        return "in progress/overange"
      case 100:
        return "Unknown"
      case "other":
        return "Unknown"
      default:
        return alert('The type of annotation does not exist.');
    }
  }
}
