import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:4401/api/order';

  constructor(private http: HttpClient) {}

  createOrder(orderData: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order`, orderData);
  }

  calculateTotalPrice(items: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/totalPrice`, items);
  }
  applyCoupon(
    items: any[],
    couponCode: string,
    userId: string
  ): Observable<any> {
    const requestBody = {
      items,
      couponCode,
      userId,
    };
    return this.http.post<any>(
      `${this.apiUrl}/order/apply-coupon`,
      requestBody
    );
  }
}
