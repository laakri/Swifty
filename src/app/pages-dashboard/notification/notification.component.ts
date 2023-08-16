import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  notifications: any = [];
  constructor(
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.fetchNotifications();
  }
  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
      (newNotification) => {
        this.notifications.unshift(newNotification);
        this.cd.detectChanges();
        console.log(this.notifications);
      },
      (error) => {
        console.error('Error receiving notification:', error);
      }
    );
  }
  getNotificationIcon(type: string): string {
    switch (type) {
      case 'info':
        return 'pi pi-info-circle';
      case 'success':
        return 'pi pi-check-circle';
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'error':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-bell';
    }
  }

  getNotificationClass(type: string): string {
    return `notification ${type}`;
  }
  markAsRead(notification: Notification) {
    this.notificationService.markNotificationAsRead(notification._id).subscribe(
      (updatedNotification) => {
        notification.seen = true;
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }
}
