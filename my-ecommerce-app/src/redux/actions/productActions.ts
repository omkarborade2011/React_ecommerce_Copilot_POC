import { Dispatch } from 'redux';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

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

interface FetchProductsRequestAction {
    type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
}

interface FetchProductsFailureAction {
    type: typeof FETCH_PRODUCTS_FAILURE;
    payload: string;
}

interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
}

interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: { id: number };
}

interface UpdateQuantityAction {
    type: typeof UPDATE_QUANTITY;
    payload: { productId: number; quantity: number };
}

export type ProductActionTypes =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction
    | AddToCartAction
    | RemoveFromCartAction
    | UpdateQuantityAction;

export const fetchProductsRequest = (): FetchProductsRequestAction => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};

export const fetchProductsSuccess = (products: Product[]): FetchProductsSuccessAction => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    };
};

export const fetchProductsFailure = (error: string): FetchProductsFailureAction => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    };
};

export const addToCart = (product: CartItem): AddToCartAction => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const removeFromCart = (product: { id: number }): RemoveFromCartAction => {
    return {
        type: REMOVE_FROM_CART,
        payload: product
    };
};

export const updateQuantity = (productId: number, quantity: number): UpdateQuantityAction => {
    return {
        type: UPDATE_QUANTITY,
        payload: { productId, quantity }
    };
};

// Async thunk action creator to fetch products
export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductActionTypes>) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data: Product[] = await response.json();
            console.log("data :", data);
            dispatch(fetchProductsSuccess(data));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(fetchProductsFailure(error.message));
            } else {
                dispatch(fetchProductsFailure('An unknown error occurred'));
            }
        }
    };
};