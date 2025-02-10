export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};

export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    };
};

export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    };
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const removeFromCart = (product) => {
    return {
        type: REMOVE_FROM_CART,
        payload: product
    };
};

export const updateQuantity = (productId, quantity) => {
    return {
        type: UPDATE_QUANTITY,
        payload: { productId, quantity }
    };
};

// Async thunk action creator to fetch products
export const fetchProducts = () => {
    return async (dispatch) => {
        //dispatch(fetchProductsRequest());
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            console.log("data :",data)
            dispatch(fetchProductsSuccess(data));
        } catch (error) {
            dispatch(fetchProductsFailure(error));
        }
    };
};