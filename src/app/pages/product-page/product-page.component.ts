import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  @Input() quantity: number = 1;

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }
}
