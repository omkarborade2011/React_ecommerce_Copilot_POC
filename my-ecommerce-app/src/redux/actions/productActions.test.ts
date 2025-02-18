import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import {
    fetchProducts,
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from './productActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

fetchMock.enableMocks();

describe('productActions', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({});
        fetchMock.resetMocks();
    });

    test('dispatches FETCH_PRODUCTS_SUCCESS after successful fetch', async () => {
        const products = [
            { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
            { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
        ];

        fetchMock.mockResponseOnce(JSON.stringify(products));

        const expectedActions = [
            { type: FETCH_PRODUCTS_REQUEST },
            { type: FETCH_PRODUCTS_SUCCESS, payload: products }
        ];

        await store.dispatch(fetchProducts() as any);
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('dispatches FETCH_PRODUCTS_FAILURE after failed fetch', async () => {
        const errorMessage = 'Failed to fetch products';

        fetchMock.mockRejectOnce(new Error(errorMessage));

        const expectedActions = [
            { type: FETCH_PRODUCTS_REQUEST },
            { type: FETCH_PRODUCTS_FAILURE, payload: errorMessage }
        ];

        await store.dispatch(fetchProducts() as any);
        expect(store.getActions()).toEqual(expectedActions);
    });
});