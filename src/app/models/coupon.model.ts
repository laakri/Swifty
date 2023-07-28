export interface Coupon {
  _id: string;
  codeMasked: boolean;
  showCode: boolean;
  code: string;
  discount: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  currentUsage: number;
  maxUsage: number;
}
