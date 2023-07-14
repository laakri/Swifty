export interface Product {
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

export interface Specification {
  name: string;
  value: string;
}
