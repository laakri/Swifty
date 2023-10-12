import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filterOptions: any = {};
  loading: boolean = true;
  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    // Call your product service to get products with filter options
    this.productService.getProducts(this.filterOptions).subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
    });
  }

  sortingOptions: any[] = [
    { label: 'Price - Low to High', value: 'lowToHigh' },
    { label: 'Price - High to Low', value: 'highToLow' },
  ];
  selectedSortingOption: string = '';

  // Other code

  onSortChange() {
    // Perform the sorting logic based on the selectedSortingOption
    // You can update the products array with the sorted results
  }
  searchProducts() {}
}
