import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:4401/api/review/';

  constructor(private http: HttpClient) {}

  // Create a method to add a review
  addReview(productId: string, reviewData: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${productId}/reviews`,
      reviewData
    );
  }
}
