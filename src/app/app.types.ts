export interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

export interface ResponsiveOptions {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
}