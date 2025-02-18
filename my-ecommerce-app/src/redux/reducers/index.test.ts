import rootReducer, { RootState } from './index';
import productReducer from './productReducer';
import authReducer from './authReducer';
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from '../actions/productActions';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

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

const initialProductState: ProductState = {
    products: [],
    cart: []
};

type ProductAction = 
    | { type: typeof FETCH_PRODUCTS_REQUEST }
    | { type: typeof FETCH_PRODUCTS_SUCCESS, payload: Product[] }
    | { type: typeof FETCH_PRODUCTS_FAILURE, payload: string }
    | { type: typeof ADD_TO_CART, payload: CartItem }
    | { type: typeof REMOVE_FROM_CART, payload: { id: number } }
    | { type: typeof UPDATE_QUANTITY, payload: { productId: number; quantity: number } }
    | { type: 'TEST_ACTION', payload: {} }
    | { type: '@@INIT' }
    | { type: '@@redux/INIT' };

const productReducerLocal = (state = initialProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return state;
        case FETCH_PRODUCTS_SUCCESS:
            return state;
        case FETCH_PRODUCTS_FAILURE:
            return state;
        case ADD_TO_CART:
            return state;
        case REMOVE_FROM_CART:
            return state;
        case UPDATE_QUANTITY:
            return state;
        default:
            return state;
    }
};

interface User {
    email: string;
    name?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

type AuthAction = 
    | { type: typeof LOGIN_REQUEST }
    | { type: typeof LOGIN_SUCCESS, payload: User }
    | { type: typeof LOGIN_FAILURE, payload: string }
    | { type: typeof LOGOUT }
    | { type: '@@INIT' }
    | { type: '@@redux/INIT' };

const authReducerLocal = (state = initialAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state;
        case LOGIN_SUCCESS:
            return state;
        case LOGIN_FAILURE:
            return state;
        case LOGOUT:
            return state;
        default:
            return state;
    }
};

describe('rootReducer', () => {
    test('should combine reducers correctly', () => {
        const state: RootState = rootReducer(undefined, { type: '@@INIT' });

        expect(state).toEqual({
            product: productReducer(undefined, { type: '@@INIT' }),
            auth: authReducer(undefined, { type: '@@INIT' })
        });
    });

    test('should handle actions correctly', () => {
        const action = { type: 'TEST_ACTION', payload: {} };
        const state: RootState = rootReducer(undefined, action);

        expect(state).toEqual({
            product: productReducer(undefined, action),
            auth: authReducer(undefined, action)
        });
    });
});