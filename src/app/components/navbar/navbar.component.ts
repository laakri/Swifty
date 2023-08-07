import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/user.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { ProductService } from 'src/app/services/product.service';

interface SearchResult {
  image: string;
  productName: string;
  category: string;
  price: number;
  review: number;
}
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
  isSmallScreen = false;
  isMenuOpen = false;
  menuItems: MenuItem[] = [];
  products: any;
  loading: boolean = true;
  constructor(
    private UsersService: UsersService,
    private cartBadgeService: CartBadgeService,
    private ProductService: ProductService
  ) {}
  isNavbarTransparent = true;
  isSearchMode = false;
  searchQuery = '';
  searchResults: any[] = [];

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

    // Check for small screen
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

    // Initialize menu items here
    this.menuItems = [
      { label: 'Women', routerLink: 'categorie' },
      { label: 'Men', routerLink: 'categorie' },
      { label: 'Deals', routerLink: 'checkout' },
      { label: "What's New", routerLink: 'order/509927' },
    ];
  }
  /*************** Global ************** */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isNavbarTransparent = false;
    } else {
      this.isNavbarTransparent = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 1100;
  }
  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1100;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  getImgSrc(): string {
    const isBrightTheme = document.body.classList.contains('light-theme');
    return isBrightTheme
      ? '../../../assets/mainlogo-black.png'
      : '../../../assets/mainlogo.png';
  }

  /*************** SearchMode ************** */
  toggleSearchMode(): void {
    this.isSearchMode = !this.isSearchMode;
    this.searchQuery = '';
    this.searchResults = [];
  }
  performSearch(): void {
    this.loading = true;

    this.ProductService.searchProducts(this.searchQuery).subscribe(
      (response: any) => {
        this.searchResults = response;
        console.log(this.searchResults);
        this.loading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    );
  }
  cancelSearch(): void {
    this.isSearchMode = false;
    this.searchQuery = '';
    this.searchResults = [];
  }
  /*************** change_theme ************** */

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
  /*************** logout ************** */

  logout() {
    this.UsersService.logout();
  }
}
