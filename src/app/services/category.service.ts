import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:4401/api/categs';

  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-categorie`, category);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/get-categories`);
  }
  getCategoriesByGender(gender: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/gender/${gender}`);
  }
  updateCategory(categoryId: string, category: Category): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/update-categories/${categoryId}`,
      category
    );
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-categories/${categoryId}`);
  }
}
