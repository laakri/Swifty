import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/user.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  private isAuthListenerSubs!: Subscription;
  cartQuantity: number = 0;

  isBrightTheme = false;
  categoryMenu: MenuItem[] | undefined;

  constructor(
    private UsersService: UsersService,
    private cartBadgeService: CartBadgeService
  ) {}

  isNavbarTransparent = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isNavbarTransparent = false;
    } else {
      this.isNavbarTransparent = true;
    }
  }
  getTotalCartQuantity(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.reduce((sum: number) => sum + 1, 0);
  }
  ngOnInit(): void {
    // Check the theme
    this.isBrightTheme = localStorage.getItem('mode') === 'bright-theme';

    // Check the Auth statement
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    // Check the Cart badge
    const totalQuantity = this.getTotalCartQuantity();
    this.cartBadgeService.updateCartQuantity(totalQuantity);

    this.cartBadgeService.cartQuantity$.subscribe((quantity) => {
      this.cartQuantity = quantity;
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
    this.isBrightTheme = !this.isBrightTheme;
    const body = document.body;
    if (this.isBrightTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
  getImgSrc(): string {
    const isBrightTheme = document.body.classList.contains('light-theme');
    return isBrightTheme
      ? '../../../assets/mainlogo.png'
      : '../../../assets/mainlogo-black.png';
  }
  logout() {
    this.UsersService.logout();
  }
}
