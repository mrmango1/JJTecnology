export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Product {
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

export interface ResponsiveOptions {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
}