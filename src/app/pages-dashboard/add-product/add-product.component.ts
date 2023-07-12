import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      images: this.fb.array([this.createImage()]),
      specifications: this.fb.array([this.createSpecification()]),
      tags: this.fb.array([this.createTag()]),
      isFeatured: [false],
    });
  }

  get imageControls() {
    return this.productForm.get('images') as FormArray;
  }

  get specificationControls() {
    return this.productForm.get('specifications') as FormArray;
  }

  get tagControls() {
    return this.productForm.get('tags') as FormArray;
  }

  createImage(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required],
    });
  }

  createSpecification(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  createTag(): FormGroup {
    return this.fb.group({
      tag: ['', Validators.required],
    });
  }
  addImage(): void {
    this.imageControls.push(this.createImage());
  }
  removeImage(index: number): void {
    this.imageControls.removeAt(index);
  }
  addSpecification(): void {
    this.specificationControls.push(this.createSpecification());
  }
  removeSpecification(index: number): void {
    this.specificationControls.removeAt(index);
  }
  addTag(): void {
    this.tagControls.push(this.fb.control(''));
  }
  removeTag(index: number): void {
    this.tagControls.removeAt(index);
  }
  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;
    console.log(productData);
    // Logic to add the product using the productData object

    // Reset the form after submission
    this.productForm.reset();
  }
}
