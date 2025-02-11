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

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default productReducer;