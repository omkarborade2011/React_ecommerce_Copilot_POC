import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authActions', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({});
    });

    test('dispatches LOGIN_SUCCESS after successful login', async () => {
        const expectedActions = [
            { type: LOGIN_REQUEST },
            { type: LOGIN_SUCCESS, payload: { user: { email: 'test@example.com' } } }
        ];

        await store.dispatch(login('test@example.com', 'password') as any);
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('dispatches LOGIN_FAILURE after failed login', async () => {
        const expectedActions = [
            { type: LOGIN_REQUEST },
            { type: LOGIN_FAILURE, payload: 'Invalid credentials' }
        ];

        await store.dispatch(login('test@example.com', 'wrongpassword') as any);
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('dispatches LOGOUT', () => {
        const expectedActions = [{ type: LOGOUT }];

        store.dispatch(logout() as any);
        expect(store.getActions()).toEqual(expectedActions);
    });
});