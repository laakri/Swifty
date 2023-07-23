export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: any;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}
