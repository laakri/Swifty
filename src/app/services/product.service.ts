import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Specification } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:4401';

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('shortDescription', product.shortDescription);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity.toString());
    for (let i = 0; i < product.images.length; i++) {
      formData.append('images', product.images[i]);
    }
    for (let i = 0; i < product.specifications.length; i++) {
      formData.append(
        `specifications[${i}].name`,
        product.specifications[i].name
      );
      formData.append(
        `specifications[${i}].value`,
        product.specifications[i].value
      );
    }
    for (let i = 0; i < product.tags.length; i++) {
      formData.append(`tags[${i}]`, product.tags[i]);
    }
    formData.append('isFeatured', product.isFeatured.toString());

    return this.http.post<Product>(
      `${this.apiUrl}/api/prods/add-product`,
      formData
    );
  }
}
