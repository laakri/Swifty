import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent {
  selectedCity!: any;
  selectedCities: any[] = [];

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
  applyFilters() {
    // Logic for applying filters
  }

  resetFilters() {
    // Logic for resetting filters
  }
}
