import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm!: FormGroup;

  categoryOptions: any[] = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initCheckoutForm();
  }

  initCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false], // Checkbox value
      phone: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      postal: ['', Validators.required],
      lastcity: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form values:', this.checkoutForm.value);
      console.log('Form values:');
      // You can perform additional actions, such as sending data to the server here
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
