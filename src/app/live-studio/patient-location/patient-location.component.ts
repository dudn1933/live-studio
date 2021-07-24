import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-patient-location',
  templateUrl: './patient-location.component.html',
  styleUrls: ['./patient-location.component.scss']
})
export class PatientLocationComponent implements OnInit {
  mapOptions: google.maps.MapOptions = {
    zoom: 17,
    center:{lat:37.371857, lng:127.873787}
  }

  constructor() {}

  ngOnInit(): void {
      this.getMap();
  }

  getMap() {
    const googleMap:any = document.getElementById('google');
    const map = new google.maps.Map(googleMap, this.mapOptions);
    const marker = new google.maps.Marker({
      position: { lat:37.371857, lng:127.873787 },
      map: map
    });
    const infoWindow = new google.maps.InfoWindow({
      content: '<h1 style="display: flex; justify-content: center; align-items: center;color:black; width:150px; height:10px; font-size:1rem; text-align:center;">MEZOO</h1>'
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    })
  }
}
