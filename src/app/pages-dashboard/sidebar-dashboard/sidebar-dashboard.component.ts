import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css'],
})
export class SidebarDashboardComponent implements OnInit {
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = false;
  newUnseenCount: number = 0;
  notifications: any;

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notificationService
      .getNotificationsCount()
      .subscribe((updatedNotification) => {
        this.newUnseenCount = updatedNotification.unseenCount;
        this.updateNotificationBadge();
      });
    this.items = [
      {
        icon: 'pi pi-home',
        routerLink: '/a/dashboard',
      },
      {
        icon: 'pi pi-bell',
        command: () => this.toggleNotification(),
      },
      {
        icon: 'pi pi-folder-open',
        routerLink: '/a/add-category',
      },
      {
        icon: 'pi pi-shopping-bag',
        routerLink: '/a/add-product',
      },
      {
        icon: 'pi pi-tag',
        routerLink: '/a/add-coupon',
      },
      {
        icon: 'pi pi-users',
        routerLink: '/a/list-users',
      },
      {
        icon: 'pi pi-list',
        routerLink: '/a/list-product',
      },
    ];
  }

  updateNotificationBadge() {
    const notificationMenuItem = this.items?.find(
      (item) => item.icon === 'pi pi-bell'
    );

    if (notificationMenuItem) {
      notificationMenuItem.badge = this.newUnseenCount.toString();
    }
  }

  toggleNotification() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  getImgSrc(): string {
    const isBrightTheme = document.body.classList.contains('light-theme');
    return isBrightTheme
      ? '../../../assets/mainlogo-black.png'
      : '../../../assets/mainlogo.png';
  }
}
