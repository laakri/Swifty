import { UsersService } from './../../services/user.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm!: FormGroup;
  UserAuth = null;
  totalPrice: number = 0;
  items: [] = [];
  couponCode: string = '';
  couponId: string = '';
  userId: string = '';
  isAuth: boolean = false;
  isCouponUsed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private messageService: MessageService,
    private OrderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuth = this.UsersService.getIsAuth();

    this.initCheckoutForm();
    this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.OrderService.calculateTotalPrice(this.items).subscribe(
      (response: any) => {
        this.totalPrice = response.totalPrice;
      },
      (error) => {
        console.error('Failed ', error);
      }
    );
  }

  initCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false], // Checkbox value
      phone: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      postal: ['', Validators.required],
      lastcity: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (this.UsersService.getIsAuth()) {
      this.UserAuth = this.UsersService.getUserId();
    }
    const orderData = {
      orderId: '',
      status: '',
      user: this.UserAuth,
      products: cartItems,
      totalAmount: this.totalPrice,
      shippingAddress:
        this.checkoutForm.value.address +
        ', ' +
        this.checkoutForm.value.postal +
        ', ' +
        this.checkoutForm.value.lastcity,
      phone: this.checkoutForm.value.phone,
      email: this.checkoutForm.value.email,
      name: this.checkoutForm.value.name,
      lastname: this.checkoutForm.value.lastname,
      couponId: this.couponId,
    };
    this.OrderService.createOrder(orderData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Product added to cart',
        });
        this.router.navigate(['/v/order', response]);
      },
      (error) => {
        console.error('Failed to Checkout', error);
      }
    );
  }
  onCreateAccount() {}
  applyCouponCode() {
    // Check if the user is authenticated
    if (this.UsersService.getIsAuth()) {
      // Get the user ID from the UsersService if the user is authenticated
      const userId = this.UsersService.getUserId();

      this.OrderService.applyCoupon(
        this.items,
        this.couponCode,
        userId
      ).subscribe(
        (response) => {
          this.totalPrice = response.totalAmount;
          this.couponId = response.couponId; // Store the couponId from the response

          // Check if the coupon is still active
          if (!response.isActive) {
            this.messageService.add({
              severity: 'error',
              summary: 'Invalid Promo Code',
              detail: 'This coupon has reached its usage limit.',
            });
          } else {
            this.isCouponUsed = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Success Message',
              detail: 'Coupon Valid',
            });
          }
        },
        (error) => {
          console.error('Failed to apply coupon', error);
        }
      );
    } else {
      // Handle the case where the user is not authenticated (optional)
      this.messageService.add({
        severity: 'warn',
        summary: 'Authentication Required',
        detail: 'Please log in to apply the coupon.',
      });
    }
  }
}
