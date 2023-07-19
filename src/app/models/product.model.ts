export interface Product {
  _id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  category: string;
  quantity: number;
  images: File[];
  specifications: Specification[];
  reviews: string[];
  tags: string[];
  isFeatured: boolean;
  averageRating?: number; // Optional property
}
export interface GetProduct {
  _id: string;
  name: string;
  price: string;
  shortDescription: string;
  category: string;
  images: { url: string }[]; // Update the type to include url property
  reviews: any[];
  createdAt: Date;
  averageRating: number;
  id: string;
  image: string;
}
export interface Specification {
  name: string;
  value: string;
}
