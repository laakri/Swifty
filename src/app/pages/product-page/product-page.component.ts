import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';
import { CartBadgeService } from 'src/app/services/cart-badge.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  quantity: number = 1;
  product: Product | undefined;
  responsiveOptions: any[]; // Add responsiveOptions property
  activeIndex: number = 0; // Add activeIndex property

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private cartBadgeService: CartBadgeService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.getProduct(productId);
      }
    });
  }

  getProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getTotalCartQuantity(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.reduce((sum: number) => sum + 1, 0);
  }
  addToCart() {
    if (this.product) {
      const productId = this.product._id;
      if (productId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

        const existingItemIndex = cartItems.findIndex(
          (item: any) => item.productId === productId
        );

        if (existingItemIndex === -1) {
          cartItems.push({ productId, quantity: this.quantity });

          localStorage.setItem('cartItems', JSON.stringify(cartItems));

          const totalQuantity = this.getTotalCartQuantity();
          this.cartBadgeService.updateCartQuantity(totalQuantity);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product added to cart',
          });
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Product is already in the cart',
          });
        }
      }
    }
  }
}
