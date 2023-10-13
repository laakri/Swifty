import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [DialogService],
})
export class OrdersListComponent {
  orders: any[] = [];
  search: string = '';
  newStatus: string = 'daz';

  // Add debounce subject
  private searchTerms = new Subject<string>();
  visible: boolean = false;

  constructor(
    private orderService: OrderService,
    public dialogService: DialogService
  ) {
    // Setup debounce
    this.searchTerms
      .pipe(
        debounceTime(300), // Adjust the delay time (in milliseconds) as needed
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.fetchOrders();
      });
  }
  statusOptions: SelectItem[] = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
  ];
  showDialog() {
    this.visible = true;
  }
  submitDialog() {
    this.visible = false;
  }

  ngOnInit() {
    this.fetchOrders();
  }

  onSearch() {
    // Push the search term into the subject
    this.searchTerms.next(this.search);
  }

  fetchOrders() {
    this.orderService.getOrders(this.search).subscribe((data) => {
      this.orders = data.orders;
    });
  }
}
