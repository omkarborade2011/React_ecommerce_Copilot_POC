export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            // Simulate an API call
            const response = await fakeApiLogin(email, password);
            dispatch({ type: LOGIN_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT });
    };
};

// Fake API call for demonstration purposes
const fakeApiLogin = (email, password) => {
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