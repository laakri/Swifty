import { Component } from '@angular/core';
import { GetProduct } from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent {
  selectedCity!: any;
  selectedCities: any[] = [];
  products: GetProduct[] = [];
  displayedProducts: GetProduct[] = []; // Products to be displayed on the current page
  totalProducts: number = 0; // Total number of products
  currentPage: number = 1; // Current page
  pageSize: number = 12; // Number of products per page
  loading: boolean = false; // Loading indicator

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    const queryParams = {
      page: this.currentPage.toString(),
      limit: this.pageSize.toString(),
    };
    this.loading = true;

    this.productService.getProducts(queryParams).subscribe(
      (response: any) => {
        if (response.products && Array.isArray(response.products)) {
          this.products = response.products;
        } else {
          this.products = [];
        }
        this.totalProducts = response.pagination.totalProducts;
        this.loading = false;
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error
      }
    );
  }

  onSortChange() {
    // Perform the sorting logic based on the selectedSortingOption
    // You can update the products array with the sorted results
  }
  applyFilters() {
    // Logic for applying filters
  }

  resetFilters() {
    // Logic for resetting filters
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.getProducts();
  }
  tab = [1, 2, 3, 4, 1, 2, 3, 4];
  categoryOptions: any[] = [
    { label: 'T-shirt', value: 'category1' },
    { label: 'Pants', value: 'category2' },
    { label: 'Casquette', value: 'category3' },
  ];
  colorOptions: any[] = [
    { label: 'Red', value: 'red' },
    { label: 'yellow', value: 'yellow' },
    { label: 'black', value: 'black' },
  ];
  priceOptions: any[] = [
    { label: '$10 - $100', value: '100' },
    { label: '$100 - $200', value: '200' },
    { label: '$200 - $300', value: '300' },
  ];
  sortingOptions: any[] = [
    { label: 'Price - Low to High', value: 'lowToHigh' },
    { label: 'Price - High to Low', value: 'highToLow' },
  ];
  selectedSortingOption: string = '';
}
