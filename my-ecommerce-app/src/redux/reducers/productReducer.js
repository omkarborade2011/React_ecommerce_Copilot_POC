import { FETCH_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART } from '../actions/productActions';

const initialState = {
    products: [],
    cart: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
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