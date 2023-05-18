export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    age: number;
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