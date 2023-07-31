import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orderId!: string;
  orderDetails: Order | undefined; // Use the updated Order interface
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // Get the orderId from the route params
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    this.orderService.getOrder(this.orderId).subscribe(
      (order) => {
        this.orderDetails = order;
        console.log(this.orderDetails);
        this.loading = false;
      },
      (error) => {
        console.error('Failed to fetch order details:', error);
        this.loading = false;
      }
    );
  }
  printOrder() {
    // Open the browser's print dialog
    window.print();
  }
  getStatusStyle(status: string | undefined): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Confirmed':
        return 'status-confirmed';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      default:
        return 'status-default';
    }
  }
}
