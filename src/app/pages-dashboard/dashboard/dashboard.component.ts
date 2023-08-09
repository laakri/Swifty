import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  revenueChartData: any;
  salesChartData: any;

  ngOnInit() {
    this.revenueChartData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Revenue',
          data: [1500, 2200, 1800, 2400, 2000],
        },
      ],
    };

    this.salesChartData = {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      datasets: [
        {
          label: 'Sales',
          data: [120, 90, 180, 150, 200],
        },
      ],
    };
  }
}
