import { Component, Input, OnInit } from '@angular/core';
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';

interface Notification {
  type: string;
  title: string;
  message: string;
  time: Date;
  seen: boolean;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  notifications: any = [
    {
      type: 'erroor',
      title: 'Ont of Stock Alert',
      message: 'Some products are running out of stock.',
      time: new Date(),
      icon: 'pi pi-exclamation-triangle',
      seen: false, // Initially unseen
    },
    {
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Some products are running out of stock.',
      time: new Date(),
      icon: 'pi pi-exclamation-triangle',
      seen: false, // Initially unseen
    },
    {
      type: 'info',
      title: 'New Order Received',
      message: 'A new order has been placed!',
      time: new Date(),
      icon: 'pi pi-shopping-cart',
      seen: true,
    },
  ];

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'info':
        return 'pi pi-info-circle';
      case 'success':
        return 'pi pi-check-circle';
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'erroor':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-bell';
    }
  }
  ngOnInit() {}
  getNotificationClass(type: string): string {
    return `notification ${type}`;
  }
  markAsRead(notification: any) {
    notification.seen = true;
  }
}
