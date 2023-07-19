import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartBadgeService {
  private cartQuantitySource = new BehaviorSubject<number>(0);
  cartQuantity$ = this.cartQuantitySource.asObservable();

  updateCartQuantity(quantity: number) {
    this.cartQuantitySource.next(quantity);
  }
}
