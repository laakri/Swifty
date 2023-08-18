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
    this.loading = false;
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
  getOrderStatusInfo(status: string | undefined) {
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
