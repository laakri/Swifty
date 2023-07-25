// add-category.component.ts
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
  };

  categories: Category[] = [];
  editingCategory!: Category | null;

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
        this.loadCategories();
        console.log('Category added successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Category Added',
          detail: 'Category has been added successfully.',
        });
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
  editCategory(category: Category): void {
    this.editingCategory = { ...category };
  }

  updateCategory(): void {
    if (this.editingCategory) {
      this.categoryService
        .updateCategory(this.editingCategory._id, this.editingCategory)
        .subscribe(
          () => {
            console.log('Category updated successfully');
            this.messageService.add({
              severity: 'success',
              summary: 'Category Updated',
              detail: 'Category has been updated successfully.',
            });
            this.editingCategory = null;
            this.loadCategories();
          },
          (error) => {
            console.error('Error updating category:', error);
          }
        );
    }
  }

  cancelEdit(): void {
    this.editingCategory = null;
  }

  deleteCategory(categoryId: string, event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this category?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            this.loadCategories();
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
