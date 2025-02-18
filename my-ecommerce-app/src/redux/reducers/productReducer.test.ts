import productReducer from './productReducer';
import { FETCH_PRODUCTS_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART, ProductActionTypes } from '../actions/productActions';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface ProductState {
    products: Product[];
    cart: CartItem[];
}

const initialState: ProductState = {
    products: [],
    cart: []
};

describe('productReducer', () => {
    test('should return the initial state', () => {
        expect(productReducer(undefined, {} as ProductActionTypes)).toEqual(initialState);
    });

    test('should handle FETCH_PRODUCTS_SUCCESS', () => {
        const products: Product[] = [
            { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
            { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
        ];
        const action: ProductActionTypes = {
            type: FETCH_PRODUCTS_SUCCESS,
            payload: products
        };
        const expectedState = {
            ...initialState,
            products
        };
        expect(productReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ADD_TO_CART', () => {
        const product: CartItem = { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg', quantity: 1 };
        const action: ProductActionTypes = {
            type: ADD_TO_CART,
            payload: product
        };
        const expectedState = {
            ...initialState,
            cart: [product]
        };
        expect(productReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle REMOVE_FROM_CART', () => {
        const initialStateWithCart: ProductState = {
            ...initialState,
            cart: [
                { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg', quantity: 1 },
                { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg', quantity: 1 }
            ]
        };
        const action: ProductActionTypes = {
            type: REMOVE_FROM_CART,
            payload: { id: 1 }
        };
        const expectedState = {
            ...initialState,
            cart: [
                { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg', quantity: 1 }
            ]
        };
        expect(productReducer(initialStateWithCart, action)).toEqual(expectedState);
    });
});