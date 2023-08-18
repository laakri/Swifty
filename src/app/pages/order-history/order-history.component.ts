import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;
  userId: string = '';
  userName: string = '';
  searchInput: string = '';
  filteredOrders: any[] = [];
  loading: boolean = true;

  constructor(
    private UsersService: UsersService,
    private OrderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userId = this.UsersService.getUserId();
    this.userName = this.UsersService.getUserName();
    this.loadOrderHistory(this.userId);
  }

  loadOrderHistory(userId: string) {
    this.OrderService.getOrdersByUserId(userId).subscribe(
      (orders) => {
        this.orderHistory = orders;
        this.filteredOrders = orders;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching order history:', error);
        this.loading = false;
      }
    );
  }
  applySearchFilter() {
    this.loading = true;

    if (!this.searchInput) {
      this.filteredOrders = this.orderHistory; // If search input is empty, show all orders
    } else {
      const lowerCaseSearch = this.searchInput.toLowerCase();
      this.filteredOrders = this.orderHistory.filter((order: any) =>
        order.orderId.toLowerCase().includes(lowerCaseSearch)
      );
    }
    this.loading = false;
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
