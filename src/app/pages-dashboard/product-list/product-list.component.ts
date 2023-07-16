import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  searchText: string = '';

  constructor() {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    // Fake product data
    this.products = [
      {
        name: 'Product 1',
        price: 10,
        category: 'Category 1',
        quantity: 5,
        averageRating: 4.5,
      },
      {
        name: 'Product 2',
        price: 20,
        category: 'Category 2',
        quantity: 3,
        averageRating: 3.8,
      },
      {
        name: 'Product 3',
        price: 15,
        category: 'Category 1',
        quantity: 8,
        averageRating: 4.2,
      },
      // Add more fake products here...
    ];

    this.totalRecords = this.products.length;
    this.loading = false;
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
  searchProducts() {
    // Perform the search logic based on the searchText and update the products array
    // You can filter the existing products array based on the search text
    if (this.searchText.trim() === '') {
      // Reset the product list when the search text is empty
      this.getProducts();
    } else {
      this.products = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.totalRecords = this.products.length;
    }
  }
}
