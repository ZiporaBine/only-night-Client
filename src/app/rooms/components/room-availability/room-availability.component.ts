import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, LegendElement, LegendOptions } from 'chart.js';

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.scss']
})
export class RoomAvailabilityComponent {
  data: ChartData<'doughnut'> = {
    labels: ['Occupied', 'Unoccupied', 'Unoccupied'],
    datasets: [
      {
        data: [33, 33, 33],
        backgroundColor: ['#140F4B', '#FF933B', '#422CFF'],
        hoverBackgroundColor: ['#140F4B', '#FF933B', '#422CFF'],
        borderWidth: 5,
        rotation: 50
      }
    ],
  };
  options: any = {
    cutout: 30,
    plugins: {
      title: {
        display: false,
        text: 'DoughnutExampleComponent',
      },
      legend: {
        display: true,
        position: 'bottom',
      }
    }
  };
}
