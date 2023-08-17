import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;

  constructor() {}

  ngOnInit(): void {
    // Simulate loading order history
    this.loadFakeOrderHistory();
  }

  loadFakeOrderHistory() {
    // Fake data for order history
    const fakeOrders = [
      {
        orderId: '156152',
        orderDate: new Date('2023-02-07'),
        totalAmount: 123.0,
        status: 'Pending',

        products: [
          {
            name: 'Product A',
            quantity: 2,
            category: 'bitchs',
            images: '../../../assets/t-shirt.png',
            price: 150,
          },
          {
            name: 'Product A',
            quantity: 2,
            category: 'bitchs',
            images: '../../../assets/t-shirt.png',
            price: 150,
          },
        ],
      },
      {
        orderId: '156152',
        orderDate: new Date('2023-02-07'),
        totalAmount: 123.0,
        status: 'Completed',

        products: [
          {
            name: 'Product A',
            quantity: 2,
            category: 'bitchs',
            images: '../../../assets/t-shirt.png',
            price: 150,
          },
          {
            name: 'Product A',
            quantity: 2,
            category: 'bitchs',
            images: '../../../assets/t-shirt.png',
            price: 150,
          },
          {
            name: 'Product A',
            quantity: 2,
            category: 'bitchs',
            images: '../../../assets/t-shirt.png',
            price: 150,
          },
        ],
      },
    ];

    this.orderHistory = fakeOrders;
  }
  getOrderStatusInfo(status: string) {
    switch (status) {
      case 'Pending':
        return { icon: 'pi pi-clock', color: 'orange' };
      case 'Processing':
        return { icon: 'pi pi-refresh', color: 'blue' };
      case 'Completed':
        return { icon: 'pi pi-check', color: 'green' };
      case 'Cancelled':
        return { icon: 'pi pi-times', color: 'red' };
      default:
        return { icon: 'pi pi-question', color: 'gray' };
    }
  }
}
