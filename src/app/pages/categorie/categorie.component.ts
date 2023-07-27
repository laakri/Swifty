import { Component } from '@angular/core';
import { GetProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent {
  selectedCategory: any = '';
  selectedPriceRange: number[] = [0, 500];
  selectedSortingOption: string = '';
  products: GetProduct[] = [];
  displayedProducts: GetProduct[] = []; // Products to be displayed on the current page
  totalProducts: number = 0; // Total number of products
  currentPage: number = 1; // Current page
  pageSize: number = 12; // Number of products per page
  loading: boolean = false; // Loading indicator
  carouselItems!: any[];
  responsiveOptions!: any[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.carouselItems = [
      {
        imageUrl: '../../assets/excellent-smiling-.png',
      },
      {
        imageUrl:
          '../../assets/pretty-lady-polka-dot-outfit-smiling-pink-wall-removebg-preview.png',
      },
    ];
    this.getProducts();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getProducts() {
    const queryParams = {
      page: this.currentPage.toString(),
      limit: this.pageSize.toString(),
      category: this.selectedCategory,
      priceRange: this.selectedPriceRange.join('-'),
      sortOption: this.selectedSortingOption,
    };

    // Loop through each property of queryParams
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key as keyof typeof queryParams];
      if (value === null) {
        queryParams[key as keyof typeof queryParams] = '';
      }
    });

    console.log(queryParams);
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
        this.loading = false;
      }
    );
  }
  updatePriceRangeDisplay() {}
  onCategoryClear() {}

  onPriceRangeClear() {}
  applyFilters() {
    this.currentPage = 1;
    this.getProducts();
  }

  onSortChange() {
    this.currentPage = 1;
  }

  resetFilters() {
    this.currentPage = 1;
    this.selectedCategory = '';
    this.selectedPriceRange = [0, 500];
    this.selectedSortingOption = '';
    this.getProducts();
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.getProducts();
  }

  tab = [1, 2, 3, 4, 1, 2, 3, 4];
  categoryOptions: any[] = [
    { label: 'T-shirt', value: 'T-shirt' },
    { label: 'Pants', value: 'Pants' },
    { label: 'Short', value: 'Short' },
    { label: 'Shoes', value: 'Shoes' },
    { label: 'Shirt', value: 'Shirt' },
  ];
  colorOptions: any[] = [
    { label: 'Red', value: 'red' },
    { label: 'yellow', value: 'yellow' },
    { label: 'black', value: 'black' },
  ];
  priceOptions: any[] = [
    { label: '$0 - $10', value: '0-10' },
    { label: '$10 - $100', value: '10-100' },
    { label: '$100 - $500', value: '100-500' },
  ];
  sortingOptions: any[] = [
    { label: 'Price - Low to High', value: 'lowToHigh' },
    { label: 'Price - High to Low', value: 'highToLow' },
  ];
}
