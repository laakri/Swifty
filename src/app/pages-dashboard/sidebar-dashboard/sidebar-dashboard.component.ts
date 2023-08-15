import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css'],
})
export class SidebarDashboardComponent implements OnInit {
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
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
