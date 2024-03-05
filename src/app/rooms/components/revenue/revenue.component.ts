import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import colorLib from '@kurkle/color';
import { RevenueService } from './revenue.service';
import { BehaviorSubject, NEVER, Observable, map, tap } from 'rxjs';
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
    // let values = [];

    // for (let i = 0; i < 1000; i++) {
    //   let x = Math.floor(Math.random() * 10);

    //   values.push(i + x);
    // }

    // this.values = values; 
    // setTimeout(() => {
    //   let val10;
    //   val10 = this.values.forEach(ds =>val10 =  val10.push(ds/10));
    //   console.log(val10, '  val10');
    // }, 100);
    // setTimeout(() => {


    //   this.data = {
    //     // labels: ['Rooms', 'Hotels'],'January',

    //     labels: ['January',
    //       'February',
    //       'March',
    //       'April',
    //       'May',
    //       'June',
    //       'July',
    //       'August',
    //       'September',
    //       'October',
    //       'November',
    //       'December'],
    //     datasets: [
    //       {
    //         label: 'Current Year',
    //         data: this.revenueService.CurrentValues,
    //         // fill: {
    //         //   target: 'origin',
    //         //   above: '#422CFF',
    //         //   below: '#422CFF'
    //         // },

    //         tension: 0

    //       },
    //       {
    //         label: '2023',
    //         data: this.revenueService.CurrentValues,
    //         // fill: {
    //         //   target: 'origin',
    //         //   above: '#422CFF',
    //         //   below: '#422CFF'
    //         // },

    //         tension: 0

    //       },
    //       {
    //         label: '2022',
    //         data: this.revenueService.hitoryValues,
    //         borderColor: 'rgb(255, 159, 64)',//Utils.CHART_COLORS.orange,
    //         backgroundColor: this.transparentize('rgb(255, 159, 64)'),// Utils.transparentize(Utils.CHART_COLORS.orange),
    //         fill: '-1'
    //       },
    //       // {
    //       //   label: 'Rooms',
    //       //   data: this.getValues(),
    //       //   // fill: {
    //       //   //   target: 'origin',
    //       //   //   above: '#422CFF',
    //       //   //   below: '#422CFF'
    //       //   // },

    //       //   tension: 0

    //       // }
    //     ]
    //   };

    // }, 200);
    // this.ds()

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
  // getValues() {
  //   let vals: number[] = [];
  //   this.revenueService.getdots$().pipe(
  //     // tap(({CurrentPriceHotel})=> console.log(CurrentPriceHotel)),

  //     map(({ CurrentPriceHotel, HistoryPriceHotel }) => {
  //       this.values = CurrentPriceHotel,
  //       this.hitoryPrices = HistoryPriceHotel,
  //       this.historyValues = this.hitoryPrices[0].HistoryPriceHotel
  //       vals = CurrentPriceHotel
  //       console.log(this.revenueService.CurrentValues);
  //       console.log(this.revenueService.hitoryValues);

  //       return this.values
  //       // console.log(CurrentPriceHotel);
  //     })
  //   ).subscribe()

  //   // let values = [];

  //   // let start = 1;
  //   // for (let i = 0; i < 1000; i++) {
  //   //   let x = Math.floor(Math.random() * 100) + 1;

  //   //   values.push(x);
  //   // }

  //   // console.log(this.values);
  //   setTimeout(() => {
  //     // this.data.datasets.forEach(ds => ds.data = this.values);
  //     this.data.datasets.forEach(ds => ds.label === 'Current Year' ? ds.data =this.revenueService.CurrentValues : ds.data =this.revenueService.hitoryValues);

  //     // console.log(this.data.datasets, '  Set Time Out');

  //   }, 200);
  //   return vals;
  // }
  
  updateCartData() {
    setInterval(() => {
      //this.data.datasets.forEach(ds =>  ds.data =this.values );
      this.data.datasets.forEach(ds => ds.label === 'Current Year' ? ds.data = this.revenueService.CurrentValues : ds.data = this.revenueService.hitoryValues);
      // console.log(this.data.datasets, '  setInterval');
      // this.data = {
      //   // labels: ['Rooms', 'Hotels'],'January',

      //   labels: ['January',
      //     'February',
      //     'March',
      //     'April',
      //     'May',
      //     'June',
      //     'July',
      //     'August',
      //     'September',
      //     'October',
      //     'November',
      //     'December'],
      //   datasets: [
      //     {
      //       label: 'Current Year',
      //       data: this.revenueService.CurrentValues,
      //       // fill: {
      //       //   target: 'origin',
      //       //   above: '#422CFF',
      //       //   below: '#422CFF'
      //       // },

      //       tension: 0

      //     },
      //     {
      //       label: '2023',
      //       data: this.revenueService.CurrentValues,
      //       // fill: {
      //       //   target: 'origin',
      //       //   above: '#422CFF',
      //       //   below: '#422CFF'
      //       // },

      //       tension: 0

      //     },
      //     {
      //       label: '2022',
      //       data:  this.revenueService.hitoryValues,//this.getValues(),
      //       borderColor: 'rgba(166, 155, 255, 1)',//Utils.CHART_COLORS.orange,
      //       backgroundColor: this.transparentize('rgba(230, 227, 255, 1)'),// Utils.transparentize(Utils.CHART_COLORS.orange),
      //       fill: '-1'
      //     },
      //     // {
      //     //   label: 'Rooms',
      //     //   data: this.getValues(),
      //     //   // fill: {
      //     //   //   target: 'origin',
      //     //   //   above: '#422CFF',
      //     //   //   below: '#422CFF'
      //     //   // },

      //     //   tension: 0

      //     // }
      //   ]
      // };
      // this.options = {
      //   // responsive: true,
      //   // maintainAspectRatio: false,
      //   scales: {
      //     y: {
      //       beginAtZero: false,
      //       type: 'linear',
      //       position: 'right'
      //     },
      //     // x: {
      //     //   beginAtZero: true,
      //     //   type: 'linear',
      //     //   position: 'right'
      //     // }
      //     // myScale: {
      //     //   type: 'logarithmic',
      //     //   position: 'right', // `axis` is determined by the position as `'y'`
      //     // }
      //   },
      //   plugins: {
      //     title: {
      //       display: false,
      //       text: 'DoughnutExampleComponent',
      //     },
      //     legend: {
      //       display: true,
      //       position: 'top'
      //     },
      //     filler: {
      //       propagate: true
      //     }
      //   },
      // };
      this.ref.chartInstance.update();
    }, 500);
  }
  // getValues(): Observable<number[]> {
  //   return this.revenueService.getdots$().pipe(
  //     map(({ CurrentPriceHotel }) => {
  //       this.values = CurrentPriceHotel;
  //       // console.log(this.values);
  //       return this.values;
  //     })
  //   );
  // }


  // getValues(): number[] {
  //   this.revenueService.getdots$().subscribe(({CurrentPriceHotel}) => {
  //     this.values = CurrentPriceHotel;
  //     console.log(this.values);
  //   });
  //   this.values = this.values.map(number =>  number/10)
  //   return this.values
  //   console.log(this.values);

  //   return this.values;
  // }
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

export interface IRevenueData {
  CurrentPriceHotel: CurrentPriceHotel[],
  HistoryPriceHotel: number[]
}
