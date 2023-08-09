import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, GetProduct, Specification } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:4401';

  constructor(private http: HttpClient) {}

  addProduct(product: Product, imagess: File[]): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('shortDescription', product.shortDescription);
    formData.append('description', product.description);
    formData.append('gender', product.gender);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity.toString());
    for (let i = 0; i < imagess.length; i++) {
      formData.append('images', imagess[i], imagess[i].name);
    }

    for (let i = 0; i < product.specifications.length; i++) {
      const specification: Specification = product.specifications[i];
      formData.append(`specifications[${i}][name]`, specification.name);
      formData.append(`specifications[${i}][value]`, specification.value);
    }
    for (let i = 0; i < product.tags.length; i++) {
      console.log(product.tags[i]);
      formData.append(`tags[${i}]`, JSON.stringify(product.tags[i])); // stringify the tags
    }

    formData.append('isFeatured', product.isFeatured.toString());

    return this.http.post<Product>(
      `${this.apiUrl}/api/prods/add-product`,
      formData
    );
  }

  getProducts(queryParams: any): Observable<any> {
    const options = {
      params: queryParams,
    };

    return this.http.get<any>(`${this.apiUrl}/api/prods/products`, options);
  }
  getProductById(id: string): Observable<Product> {
    const url = `${this.apiUrl}/api/prods/product/${id}`;
    return this.http.get<Product>(url);
  }

  getCartProducts(productIds: string[]): Observable<Product[]> {
    const payload = { productIds };
    return this.http.post<Product[]>(
      `${this.apiUrl}/api/prods/get-cart-products`,
      payload
    );
  }
  searchProducts(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/prods/search-products/?query=${query}`;
    return this.http.get<any[]>(url);
  }
  updateViewCount(productId: string) {
    return this.http.post(
      `${this.apiUrl}/api/prods/products/${productId}/view`,
      {}
    );
  }
}
