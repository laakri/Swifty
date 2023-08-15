import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private baseUrl = 'http://localhost:4401/api/dashboard'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getAnalyticsData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/analytics`);
  }

  getDailyRevenueChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/revenue-chart-data`);
  }

  getClientChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/client-chart-data`);
  }

  getCategoryProductCountData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category-product-count`);
  }
  gettopSellingProductsData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/top-selling-products`);
  }
}
