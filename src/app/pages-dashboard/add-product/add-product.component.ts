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

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  imageControls!: FormArray;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      images: this.fb.array([]),
      specifications: this.fb.array([this.createSpecification()]),
      tags: this.fb.array([this.createTag()]),
      isFeatured: [false],
    });
    this.imageControls = this.productForm.get('images') as FormArray;
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
    this.tagControls.push(this.fb.control(''));
  }
  removeTag(index: number): void {
    this.tagControls.removeAt(index);
  }
  /*************** Image *******************/

  addImage(): void {
    this.imageControls.push(this.createImage());
  }
  removeImage(index: number): void {
    this.imageControls.removeAt(index);
  }
  onImageSelected(event: FileSelectEvent, index: number): void {
    const file = event.files[0]; // Get the selected file

    if (file) {
      const imageControl = this.imageControls.controls[index];
      imageControl.patchValue({ file }); // Set the file value in the form control

      // Log the file object
      console.log('Selected file:', file);
    }
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
    console.log(productData);
    this.productService.addProduct(productData).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.productForm.reset();
      },
      (error) => {
        console.error('Failed to add product:', error);
      }
    );
  }
}
