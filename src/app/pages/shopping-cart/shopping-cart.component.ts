import { Component, OnInit } from '@angular/core';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private cartBadgeService: CartBadgeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getCartItems();
  }

  get subtotals(): number {
    const subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.quantityuser * item.price,
      0
    );
    return Number(subtotal.toFixed(2));
  }

  updateQuantity(item: any, quantity: number) {
    item.quantityuser = quantity;
    item.subtotal = item.quantityuser * item.price;
  }
  getTotalCartQuantity(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.reduce((sum: number) => sum + 1, 0);
  }
  removeProduct(item: any) {
    const updatedCartItems = this.cartItems.filter(
      (product) => product.id !== item.id
    );
    this.cartItems = updatedCartItems;
    const updatedCartItemsJson = JSON.stringify(
      updatedCartItems.map((product) => ({
        productId: product.id,
        quantity: product.quantityuser,
      }))
    );
    localStorage.setItem('cartItems', updatedCartItemsJson);
    const totalQuantity = this.getTotalCartQuantity();
    this.cartBadgeService.updateCartQuantity(totalQuantity);
  }

  getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const productIds = cartItems.map((item: any) => item.productId);
    const quantityIds = cartItems.map((item: any) => item.quantity);

    this.productService.getCartProducts(productIds).subscribe(
      (products) => {
        this.cartItems = products.map((product: any, index: number) => {
          let status: string = 'Unknown';
          if (product.quantity === 0) {
            status = 'Out of stock';
          } else if (product.quantity > 10) {
            status = 'In stock';
          } else if (product.quantity > 0) {
            status = 'Low stock';
          }

          return {
            ...product,
            quantityuser: quantityIds[index],
            status: status,
          };
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStatusIcon(status: string) {
    if (status === 'Out of stock') {
      return 'pi pi-times-circle';
    } else if (status === 'In stock') {
      return 'pi pi-check-circle';
    } else if (status === 'Low stock') {
      return 'pi pi-exclamation-triangle';
    } else {
      return 'pi pi-question-circle';
    }
  }

  getStatusColor(status: string) {
    if (status === 'Out of stock') {
      return { color: 'red' };
    } else if (status === 'In stock') {
      return { color: 'green' };
    } else if (status === 'Low stock') {
      return { color: 'orange' };
    } else {
      return { color: 'gray' };
    }
  }

  checkout() {
    const outOfStockItems = this.cartItems.filter(
      (item) => item.status === 'Out of stock'
    );

    if (outOfStockItems.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Some Items Are Out of Stock',
        detail:
          'Before proceeding to checkout, please review your cart. Some items are currently out of stock. You can remove them to continue.',
        life: 6000,
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure you want to proceed to checkout?',
        header: 'Confirm Checkout',
        icon: 'pi pi-shopping-cart',
        acceptLabel: 'Yes, Proceed',
        rejectLabel: 'No',

        accept: () => {
          this.router.navigateByUrl('/v/checkout');
        },
      });
    }
  }
}
