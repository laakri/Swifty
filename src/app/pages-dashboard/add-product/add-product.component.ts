import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { FileSelectEvent } from 'primeng/fileupload';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  imageControls!: FormArray;
  imagess!: File[];
  uploadedFiles: any[] = [];

  showedCategories: Category[] = [];

  // ... Rest of the component ...

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private productService: ProductService,
    private CategoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      quantity: ['', Validators.required],
      images: this.fb.array([]),
      specifications: this.fb.array([this.createSpecification()]),
      tags: this.fb.array([this.createTag()]),
      isFeatured: [false],
    });
    this.imageControls = this.productForm.get('images') as FormArray;
  }
  ngOnInit(): void {
    this.fetchCategoriesByGender();
  }

  getCategoryOptions(): Category[] {
    const gender = this.productForm.get('gender')?.value;
    switch (gender) {
      case 'male':
        return this.showedCategories;
      case 'female':
        return this.showedCategories;
      case 'other':
        return this.showedCategories;
      default:
        return [];
    }
  }

  fetchCategoriesByGender() {
    this.CategoryService.getCategories().subscribe(
      (categories) => {
        this.showedCategories = categories;
        console.log(this.showedCategories);
      },
      (error) => {
        console.error('Failed to fetch male categories:', error);
      }
    );
  }
  /*************** Specification *******************/
  get specificationControls() {
    return this.productForm.get('specifications') as FormArray;
  }

  createSpecification(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  addSpecification(): void {
    this.specificationControls.push(this.createSpecification());
  }
  removeSpecification(index: number): void {
    this.specificationControls.removeAt(index);
  }

  /*************** Tag *******************/

  get tagControls() {
    return this.productForm.get('tags') as FormArray;
  }
  createTag(): FormGroup {
    return this.fb.group({
      tag: ['', Validators.required],
    });
  }

  addTag(): void {
    this.tagControls.push(this.createTag());
  }

  removeTag(index: number): void {
    this.tagControls.removeAt(index);
  }
  /*************** Image *******************/

  onImageSelected(event: any): void {
    const files = event.files;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.imagess = files;
  }

  createImage(): FormGroup {
    return this.fb.group({
      file: [null, Validators.required], // Add a new form control for the file
    });
  }

  /*************** addProduct *******************/

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }
    const productData = this.productForm.value;
    const category = this.productForm.value.category._id;
    this.productService
      .addProduct(productData, this.imagess, category)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Product added successfully:',
          });
          /*this.productForm.reset();*/
        },
        (error) => {
          console.error('Failed to add product:', error);
        }
      );
  }
}
