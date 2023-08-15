import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/dashboard.service';
interface EventItem {
  status?: string;
  date?: string;
  name?: string;
  icon?: string;
  phone?: string;
  email?: string;
  color?: string;
  totalAmount?: string;
}
interface TopSellingProduct {
  name: string;
  sales: number;
}
interface StockItem {
  name: string;
  available: number;
  onHold: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  revenueChartData: any;
  salesChartData: any;
  chartOptionss: any;
  clientchartOptionss: any;
  chartOptions: any;
  clientChartData: any;
  categoryChartData: any;
  stockChartData: any;
  topSellingProducts: any;
  stockChartOptions: any;
  AnalyticsData!: any;
  constructor(private analyticsService: AnalyticsService) {}

  stockItems: StockItem[] = [
    { name: 'Product A', available: 150, onHold: 20 },
    { name: 'Product B', available: 100, onHold: 10 },
    { name: 'Product C', available: 200, onHold: 15 },
    { name: 'Product D', available: 80, onHold: 5 },
    { name: 'Product C', available: 200, onHold: 15 },
  ];
  orderEvents: EventItem[] = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      name: 'John Doe',
      phone: '24-989-104',
      totalAmount: '150.00',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      name: 'Alice Smith',
      phone: '24-989-104',
      totalAmount: '220.00',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      name: 'Bob Johnson',
      phone: '24-989-104',
      totalAmount: '180.00',
    },
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      name: 'John Doe',
      phone: '24-989-104',
      totalAmount: '150.00',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      name: 'Alice Smith',
      phone: '24-989-104',
      totalAmount: '220.00',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      name: 'Bob Johnson',
      phone: '24-989-104',
      totalAmount: '180.00',
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'Ordered':
        return '#fd6160';
      case 'Shipped':
        return '#0f8bfd';
      case 'Delivered':
        return '#0ad18b';
      default:
        return '';
    }
  }
  ngOnInit() {
    /******************* getAnalyticsData *************** */
    this.analyticsService
      .getAnalyticsData()
      .subscribe((data) => (this.AnalyticsData = data));

    /******************* getDailyRevenueChartData *************** */
    this.analyticsService
      .getDailyRevenueChartData()
      .subscribe((data) => (this.revenueChartData = data));

    this.chartOptions = {
      scales: {
        x: {
          barPercentage: 0.3,
          grid: {
            color: 'rgba(196, 196, 196, 0.05)',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(196, 196, 196, 0.05)',
          },
        },
      },
    };
    /******************* getClientChartData *************** */

    this.analyticsService
      .getClientChartData()
      .subscribe((data) => (this.clientChartData = data));

    this.chartOptionss = {
      cutout: '60%',
      offset: 20,
      borderRadius: 5,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    };
    /******************* getCategoryProductCountData *************** */
    this.analyticsService.getCategoryProductCountData().subscribe((data) => {
      this.categoryChartData = data;
      this.salesChartData = {
        labels: this.categoryChartData?.categoryNames,
        datasets: [
          {
            label: 'Sales',
            data: this.categoryChartData?.productCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
          },
        ],
      };
      console.log(this.salesChartData);
    });

    /******************* gettopSellingProductsData *************** */
    this.analyticsService
      .gettopSellingProductsData()
      .subscribe((data) => (this.topSellingProducts = data));

    /******************* stockChartData *************** */

    this.stockChartData = {
      labels: this.stockItems.map((item) => item.name),
      datasets: [
        {
          label: 'Available',
          data: this.stockItems.map((item) => item.available),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'On Hold',
          data: this.stockItems.map((item) => item.onHold),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };

    this.stockChartOptions = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
    };

    this.clientchartOptionss = {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    // Inside the DashboardComponent class
  }
}
