export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: File |null;
    image_path?: string;

    category_id: number;
    category: string;

    brand_id: number
    brand: string;

    description?: string;
    reorder_level:number;
     active: boolean;
}
export const defaultProduct: Product= {
    id:0,
    name: 'Laptop',
    price: 0,
    quantity:0,

    category_id: 0,
    category: '',

    brand_id: 0,
    brand:'',

    description: '',
    reorder_level:0,
    active: true
}