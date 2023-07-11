import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent {
  tab = [1, 2, 3, 4, 1, 2, 3, 4];
  categoryOptions: any[] = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];
  applyFilters() {
    // Logic for applying filters
  }

  resetFilters() {
    // Logic for resetting filters
  }
}
