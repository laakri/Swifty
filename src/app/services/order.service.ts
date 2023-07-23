import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:4401/api/order';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order`, orderData);
  }

  calculateTotalPrice(items: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/totalPrice`, items);
  }
}
