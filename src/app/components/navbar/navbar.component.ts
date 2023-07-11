import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  private isAuthListenerSubs!: Subscription;

  isBrightTheme: any;
  categoryMenu: MenuItem[] | undefined;

  constructor(private UsersService: UsersService) {}
  isNavbarTransparent = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isNavbarTransparent = false;
    } else {
      this.isNavbarTransparent = true;
    }
  }
  ngOnInit(): void {
    // Check the theme
    this.isBrightTheme = document.body.classList.contains('bright-theme');

    // Check the Auth statement
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    // the Category menu action
    this.categoryMenu = [
      {
        label: 'Men',
        items: [
          { label: 'T-Shirt', routerLink: '/men/t-shirt' },
          { label: 'Pants', routerLink: '/men/pants' },
        ],
      },
      {
        label: 'Women',
        items: [
          { label: 'Dresses', routerLink: '/women/dresses' },
          { label: 'Skirts', routerLink: '/women/skirts' },
        ],
      },
    ];
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
  logout() {
    this.UsersService.logout();
  }
}
