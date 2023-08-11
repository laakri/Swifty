import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css'],
})
export class SidebarDashboardComponent implements OnInit {
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = true;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-home',
        routerLink: '/a/dashboard',
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
}
