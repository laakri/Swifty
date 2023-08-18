import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private baseUrl = 'http://localhost:4401/api/recommend';

  constructor(private http: HttpClient) {}

  getRecommendations(userData: any): Observable<any> {
    const url = `${this.baseUrl}/recommend`;
    return this.http.post<any>(url, userData);
  }
}
