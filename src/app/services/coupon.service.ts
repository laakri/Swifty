import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiUrl = 'http://localhost:4401/api/coupon';

  constructor(private http: HttpClient) {}

  // Function to add a new coupon
  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.apiUrl}/add-coupon`, coupon);
  }
  // Function to get all coupons
  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.apiUrl}/get-coupons`);
  }
  deleteCouponById(couponId: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${couponId}`;
    return this.http.delete<any>(url);
  }
}
