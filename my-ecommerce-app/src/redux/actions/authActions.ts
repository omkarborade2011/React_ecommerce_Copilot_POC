import { Dispatch } from 'redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

interface User {
    email: string;
    name?: string;
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { user: User };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            // Simulate an API call
            const response = await fakeApiLogin(email, password);
            dispatch({ type: LOGIN_SUCCESS, payload: response });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: LOGIN_FAILURE, payload: error.message });
            } else {
                dispatch({ type: LOGIN_FAILURE, payload: 'An unknown error occurred' });
            }
        }
    };
};

export const logout = () => {
    return (dispatch: Dispatch<LogoutAction>) => {
        dispatch({ type: LOGOUT });
    };
};

// Fake API call for demonstration purposes
const fakeApiLogin = (email: string, password: string): Promise<{ user: User }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                resolve({ user: { email } });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
};