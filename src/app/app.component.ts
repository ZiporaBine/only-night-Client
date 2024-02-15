import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ArcElement, BarController, BarElement, CategoryScale, DoughnutController, LinearScale, LineController, LineElement, PieController, PointElement, PolarAreaController, RadarController, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'only-night-dashboard';
  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    Chart.register(
      ArcElement,
      BarController,
      BarElement,
      CategoryScale,
      DoughnutController,
      LinearScale,
      LineController,
      LineElement,
      PieController,
      PointElement,
      PolarAreaController,
      RadarController,
      RadialLinearScale,
      Title,
      Tooltip,
      Legend,
      Filler
    );
  }
}