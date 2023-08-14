import { Component, OnInit } from '@angular/core';
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
  stockChartData: any;
  stockChartOptions: any;
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
  topSellingProducts: TopSellingProduct[] = [
    { name: 'Product A', sales: 320 },
    { name: 'Product B', sales: 250 },
    { name: 'Product C', sales: 180 },
    { name: 'Product D', sales: 150 },
    { name: 'Product D', sales: 150 },
    { name: 'Product B', sales: 250 },
    { name: 'Product D', sales: 150 },
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
    this.revenueChartData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Revenue',
          data: [1500, 2200, 1800, 2400, 2000],
          barPercentage: 0.2,
          borderRadius: 5,
          backgroundColor: ['#12b4b1'],
        },
      ],
    };

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
    this.salesChartData = {
      labels: ['Watches', 'Clothing', 'Gadgets', 'Accessories'],
      datasets: [
        {
          label: 'Sales',
          data: [120, 90, 180, 150, 200],
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
    this.clientChartData = {
      labels: ['Watches', 'Clothing', 'Gadgets', 'Accessories'],
      datasets: [
        {
          label: 'Clients',
          data: [120, 90, 180, 150, 200],
          borderColor: 'rgba(255, 99, 132, 0.8)', // Change the color as needed
          borderWidth: 2,
          fill: false, // Don't fill the area under the line
          lineTension: 0.5, // Adjust the value for the bouncy effect
        },
      ],
    };
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
