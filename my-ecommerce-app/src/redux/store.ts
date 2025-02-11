import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { RootState } from './reducers';

const store: Store<RootState> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;