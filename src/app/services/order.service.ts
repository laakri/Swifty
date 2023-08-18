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
  // Get an order by order code (orderId)
  getOrder(orderCode: string): Observable<any> {
    const url = `${this.apiUrl}/Get-order/${orderCode}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Failed to retrieve the order:', error);
        throw error;
      })
    );
  }
  getOrdersByUserId(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/orders/${userId}`;
    return this.http.get<any[]>(url);
  }
}
