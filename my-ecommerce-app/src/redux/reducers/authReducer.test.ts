import authReducer from '../reducers/authReducer';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, AuthActionTypes } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

describe('authReducer', () => {
    it('should return the initial state when no action is passed', () => {
        expect(authReducer(undefined, {} as AuthActionTypes)).toEqual(initialState);
    });

    it('should handle LOGIN_SUCCESS', () => {
        const action: AuthActionTypes = {
            type: LOGIN_SUCCESS,
            payload: { user: { email: 'test@example.com', name: 'Test User' } }
        };
        
        const expectedState = {
            isAuthenticated: true,
            user: { email: 'test@example.com', name: 'Test User' },
            error: null,
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOGIN_FAILURE', () => {
        const action: AuthActionTypes = {
            type: LOGIN_FAILURE,
            payload: 'Invalid credentials'
        };

        const expectedState = {
            isAuthenticated: false,
            user: null,
            error: 'Invalid credentials',
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOGOUT', () => {
        const loggedInState = {
            isAuthenticated: true,
            user: { email: 'test@example.com', name: 'Test User' },
            error: null,
        };

        const action: AuthActionTypes = { type: LOGOUT };
        expect(authReducer(loggedInState, action)).toEqual(initialState);
    });
});
