export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'tops' | 'bottoms' | 'accessories';
    description: string;
    imageUrl: string;
    sizes: string[];
}

export type CategoryFilter = 'all' | Product['category'];