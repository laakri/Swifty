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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  revenueChartData: any;
  salesChartData: any;
  chartOptionss: any;
  chartOptions: any;
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
      status: 'Shipped',
      date: '15/10/2020 16:15',
      name: 'Alice Smith',
      phone: '24-989-104',
      totalAmount: '220.00',
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
    this.revenueChartData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Revenue',
          data: [1500, 2200, 1800, 2400, 2000],
          barPercentage: 0.1,
          borderRadius: 10,
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
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
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
  }
}
