import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category: Category = {
    _id: '',
    name: '',
    gender: 'Men',
  };
  genderOptions: any[] = [
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' },
    { label: 'Neutral', value: 'Neutral' },
  ];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
  }
  addCategory(): void {
    this.categoryService.addCategory(this.category).subscribe(
      (response) => {
        console.log('Category added successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Category Added',
          detail: 'Category has been added successfully.',
        });
        // Handle any additional actions or notifications upon successful category addition
      },
      (error) => {
        console.error('Error adding category:', error);
        // Handle error cases and display appropriate notifications to the user
      }
    );
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
        // Handle error cases and display appropriate notifications to the user
      }
    );
  }

  deleteCategory(categoryId: string, event: Event): void {
    // Show the confirmation popup
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this category?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // User confirmed, delete the category
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            this.loadCategories(); // Refresh the category list after successful deletion
            console.log('Category deleted successfully');
            this.messageService.add({
              severity: 'success',
              summary: 'Category Deleted',
              detail: 'Category has been deleted successfully.',
            });
          },
          (error) => {
            console.error('Error deleting category:', error);
            // Handle error cases and display appropriate notifications to the user
          }
        );
      },
      reject: () => {
        // User declined, do nothing
      },
    });
  }
}
