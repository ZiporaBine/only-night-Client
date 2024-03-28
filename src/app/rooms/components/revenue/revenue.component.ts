import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import colorLib from '@kurkle/color';
import { RevenueService } from './revenue.service';
import { NEVER, Observable } from 'rxjs';
import { ChartjsComponent } from '@ctrl/ngx-chartjs';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})

export class RevenueComponent implements OnInit {
  values: number[] = [];
  historyValues: number[] = [];
  hitoryPrices: HistoryPriceHotel[] = [];
  values$: Observable<number> = NEVER;

  @ViewChild('ref', { static: true }) ref!: ChartjsComponent;

  constructor(private revenueService: RevenueService) {

  }
  ngOnInit(): void {
    // this.getValues();
    console.log(this.revenueService.CurrentValues);
    this.updateCartData();

  }
  transparentize(value: any, opacity?: any) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }
  
  updateCartData() {
    setInterval(() => {
      this.data.datasets.forEach(ds => ds.label === 'Current Year' ? ds.data = this.revenueService.CurrentValues : ds.data = this.revenueService.hitoryValues);
      this.ref.chartInstance.update();
    }, 500);
  }

  data: ChartData<'line'> = {
    // labels: ['Rooms', 'Hotels'],'January',
    labels: ['January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'],
    datasets: [
      {
        label: 'Current Year',
        data: this.revenueService.CurrentValues,
        // fill: {
        //   target: 'origin',
        //   above: '#422CFF',
        //   below: '#422CFF'
        // },

        tension: 0

      },
      {
        label: '2023',
        data: this.revenueService.CurrentValues,
        // fill: {
        //   target: 'origin',
        //   above: '#422CFF',
        //   below: '#422CFF'
        // },

        tension: 0

      },
      {
        label: '2022',
        data: this.revenueService.hitoryValues,//this.getValues(),
        borderColor: 'rgba(166, 155, 255, 1)',//Utils.CHART_COLORS.orange,
        backgroundColor: this.transparentize('rgba(230, 227, 255, 1)'),// Utils.transparentize(Utils.CHART_COLORS.orange),
        fill: '-1'
      },
      // {
      //   label: 'Rooms',
      //   data: this.getValues(),
      //   // fill: {
      //   //   target: 'origin',
      //   //   above: '#422CFF',
      //   //   below: '#422CFF'
      //   // },
      //   tension: 0
      // }
    ]
  };
  options: ChartOptions<'line'> = {
    // responsive: true,
    // maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        type: 'linear',
        position: 'right'
      },
      // x: {
      //   beginAtZero: true,
      //   type: 'linear',
      //   position: 'right'
      // }
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

export interface RevenueData {
  HotelId: number,
  RoomID: number,
  RoomPrice: number,
  CurrentPriceHotel: number[],
  HistoryPriceHotel: number[]
}

export interface HistoryPriceHotel {
  Year: number,
  HistoryPriceHotel: number[]
}

export interface CurrentPriceHotelValue {
  RoomClass: string,
  Price: number
}

export interface CurrentPriceHotel {
  Date: string,
  Values: CurrentPriceHotelValue[]
}

export interface HistoryPriceHotel {
  Year: number,
  Values: number[]
}

export interface IRevenueData {
  CurrentPriceHotel: CurrentPriceHotel[],
  HistoryPriceHotel: HistoryPriceHotel[]
}
