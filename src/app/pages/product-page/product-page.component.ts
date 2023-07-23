import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';

import { UsersService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  quantity: number = 1;
  product: Product | undefined;
  responsiveOptions: any[]; // Add responsiveOptions property
  activeIndex: number = 0; // Add activeIndex property
  averageRating: number = 2.5;
  showReviewForm: boolean = false;
  reviewForm: any;
  reviews: Review[] = [];
  isLoading: boolean = true; // Add the isLoading variable
  currentSkip = 0;
  hasMoreReviews: boolean = true;
  rating = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private cartBadgeService: CartBadgeService,
    private reviewService: ReviewService,
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.getProduct(productId);
      }
    });
    this.reviews = [];
    this.showMoreReviews();
    this.reviewForm = this.formBuilder.group({
      rating: [5, Validators.required],
      comment: ['', Validators.required],
    });
    this.isLoading = false;
  }
  parseTag(tag: string): { tag: string } {
    return JSON.parse(tag);
  }
  getProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getTotalCartQuantity(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.reduce((sum: number) => sum + 1, 0);
  }
  addToCart() {
    if (this.product) {
      const productId = this.product._id;
      if (productId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

        const existingItemIndex = cartItems.findIndex(
          (item: any) => item.productId === productId
        );

        if (existingItemIndex === -1) {
          cartItems.push({ productId, quantity: this.quantity });

          localStorage.setItem('cartItems', JSON.stringify(cartItems));

          const totalQuantity = this.getTotalCartQuantity();
          this.cartBadgeService.updateCartQuantity(totalQuantity);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product added to cart',
          });
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Product is already in the cart',
          });
        }
      }
    }
  }

  showMoreReviews() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        const skip = this.reviews.length;
        this.isLoading = true;
        this.reviewService.getReviewsForProduct(productId, skip).subscribe(
          (response: any) => {
            const { reviews, hasMoreReviews } = response;
            if (reviews.length > 0) {
              this.reviews.push(...reviews);
              console.log(this.reviews);
              this.isLoading = false;
            }
            this.hasMoreReviews = hasMoreReviews;
          },
          (error: any) => {
            console.error('Error:', error);
            this.isLoading = false;
          }
        );
      }
    });
  }

  addReview() {
    // Show the review form when the button is clicked
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const reviewData = {
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        userId: this.userService.getUserId(),
      };
      this.route.paramMap.subscribe((params) => {
        const productId = params.get('id');
        if (productId) {
          this.reviewService.addReview(productId, reviewData).subscribe(
            (response) => {
              // Handle success
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Review added successfully',
              });
              // Reset the form fields after submission
              this.reviewForm.reset();
            },
            (error) => {
              // Handle error
              console.error('Error adding review:', error);
            }
          );
        }
      });
    }
  }
}
