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
  constructor(
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private messageService: MessageService,
    private OrderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
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
}
