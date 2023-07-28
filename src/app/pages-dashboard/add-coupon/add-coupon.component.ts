import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
})
export class AddCouponComponent {
  couponForm!: FormGroup;
  coupons: Coupon[] = [];
  cols!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private couponService: CouponService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initCouponForm();
    this.getAllCoupons();
    this.cols = [
      { field: 'code', header: 'Coupon Code' },
      { field: 'actions', header: '' },
      { field: 'discount', header: 'discount ' },
      { field: 'currentUsage', header: 'Current Usage' },
      { field: 'maxUsage', header: 'Max Usage' },
      { field: 'isActive', header: 'isActive' },
      { field: 'validFrom', header: 'Valid From' },
      { field: 'validTo', header: 'Valid To' },
      { field: 'delete', header: 'Delete' },
    ];
  }

  initCouponForm() {
    this.couponForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(8)]],
      discount: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      validFrom: ['', Validators.required],
      validTo: ['', [Validators.required, this.validateValidTo]],
    });
  }

  getAllCoupons() {
    this.couponService.getAllCoupons().subscribe(
      (coupons) => {
        this.coupons = coupons;
        this.coupons.forEach((coupon) => {
          coupon.codeMasked = true;
        });
      },
      (error) => {
        console.error('Error fetching coupons:', error);
      }
    );
  }

  toggleCodeVisibility(coupon: Coupon) {
    coupon.codeMasked = !coupon.codeMasked;
  }

  getMaskedCode(code: string, masked: boolean): string {
    return masked ? code.replace(/./g, '*') : code;
  }
  generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomCode += chars[randomIndex];
    }
    this.couponForm.patchValue({ code: randomCode });
  }

  validateValidTo(control: any) {
    if (control.parent && control.parent.value.validFrom && control.value) {
      const validFromDate = new Date(control.parent.value.validFrom);
      const validToDate = new Date(control.value);

      if (validToDate <= validFromDate) {
        return { invalidValidTo: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.couponForm.valid) {
      const couponData: Coupon = this.couponForm.value;
      this.couponService.addCoupon(couponData).subscribe(
        (response) => {
          // Handle success
          console.log('Coupon added successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Category Added',
            detail: 'Category has been added successfully.',
          });
          this.couponForm.reset();
        },
        (error) => {
          // Handle error
          console.error('Error adding coupon:', error);
        }
      );
    }
  }
  deleteCoupon(couponId: string) {
    this.couponService.deleteCouponById(couponId).subscribe(
      (response) => {
        // Handle success
        console.log('Coupon deleted successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Coupon Deleted',
          detail: 'Coupon has been deleted successfully.',
        });

        // Refresh the coupons list
        this.getAllCoupons();
      },
      (error) => {
        // Handle error
        console.error('Error deleting coupon:', error);
      }
    );
  }
}
