import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isBrightTheme: any;
  categoryMenu: MenuItem[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.categoryMenu = [
      {
        label: 'Men',
        items: [
          { label: 'T-Shirt', routerLink: '/men/t-shirt' },
          { label: 'Pants', routerLink: '/men/pants' },
          // Add more items for men's categories
        ],
      },
      {
        label: 'Women',
        items: [
          { label: 'Dresses', routerLink: '/women/dresses' },
          { label: 'Skirts', routerLink: '/women/skirts' },
          // Add more items for women's categories
        ],
      },
    ];

    this.isBrightTheme = document.body.classList.contains('bright-theme');
  }

  change_theme(): void {
    const currentTheme = document.body.classList.contains('bright-theme')
      ? 'bright-theme'
      : 'dark-theme';
    const newTheme =
      currentTheme === 'bright-theme' ? 'dark-theme' : 'bright-theme';

    localStorage.setItem('mode', newTheme);

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
  }
}
