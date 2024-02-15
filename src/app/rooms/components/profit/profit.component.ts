import { Component } from '@angular/core';
// import {} from "googlemaps";


@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent {
  //  map: google.maps.Map | undefined;
  //  center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
  
  //  initMap(): void {
  //   this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: this.center,
  //     zoom: 8
  //   });
  // }
  display: any;
    center: google.maps.LatLngLiteral = {
        lat: 22.2736308,
        lng: 70.7512555
    };
    zoom = 6;
  
    /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
  
    /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}
