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
        label: 'Global',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: '/a/dashboard',
          },
        ],
      },
      {
        label: 'Product ',
        items: [
          {
            label: 'Add',
            icon: 'pi pi-plus-circle',
            routerLink: '/a/add-product',
          },
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: '/a/list-product',
          },
          {
            label: 'Users',
            icon: 'pi pi-users',
            routerLink: '/a/list-users',
          },
        ],
      },
    ];
  }
}
