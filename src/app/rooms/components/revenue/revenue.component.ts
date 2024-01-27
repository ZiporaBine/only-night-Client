import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent {
  // values: number[];

  constructor() {
    // let values = [];

    // for (let i = 0; i < 1000; i++) {
    //   let x = Math.floor(Math.random() * 10);

    //   values.push(i + x);
    // }

    // this.values = values;
  }

  getValues(): number[] {
    let values = [];

    let start = 1;
    for (let i = 0; i < 1000; i++) {
      let x = Math.floor(Math.random() * 100) + 1;

      values.push(x);
    }

    console.log(values);

    return values;
  }

  data: ChartData<'line'> = {
    labels: ['Rooms', 'Hotels'],
    datasets: [
      {
        label: 'Rooms',
        data: this.getValues(),
        // fill: {
        //   target: 'origin',
        //   above: '#422CFF',
        //   below: '#422CFF'
        // },

        tension: 0

      }
    ]
  };
  options: ChartOptions<'line'> = {
    // responsive: true,
    // maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'right'
      }
      // myScale: {
      //   type: 'logarithmic',
      //   position: 'right', // `axis` is determined by the position as `'y'`
      // }
    },
    plugins: {
      title: {
        display: false,
        text: 'DoughnutExampleComponent',
      },
      legend: {
        display: true,
        position: 'top'
      },
      filler: {
        propagate: true
      }
    },
  };
}
