export interface IProduct {
    id: number;
    plu: string;
    name: string;
    product_category_id: number;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user?: any;
    updated_date?: any;
}
export interface IProductVariant {
    id: number;
    product_id: number;
    code: string;
    name: string;
    qty: number;
    price: number;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user?: any;
    updated_date?: any;
}

export interface IProductCategory {
    id: number;
    name: string;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user?: any;
    updated_date?: any;
}

export interface ITransaction {
    id: number;
    transaction_no: string;
    total_amount: number;
    active: boolean, 
    created_user: string, 
    created_date: string;
    updated_user: any;
    updated_date: any;
}

export interface ITransactionDetail {
    id: number;
    transaction_id: string;
    product_variant_id: number;
    price: number
    qty: number
    subtotal: number;
    active: boolean;
    created_user: string;
    created_date: string
    updated_user: any;
    updated_date: any;
}