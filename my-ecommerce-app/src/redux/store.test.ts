import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from './store';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // your reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

const mockStore = configureStore<RootState>([thunk]);

describe('Redux Store', () => {
    it('should create a store with the correct initial state', () => {
        const testStore = store.getState();
        expect(testStore).toEqual(rootReducer(undefined, { type: '@@INIT' }));
    });

    it('should dispatch an action and update state correctly', () => {
        const testStore = mockStore({});
        const action = { type: 'TEST_ACTION' };
        
        testStore.dispatch(action);
        const actions = testStore.getActions();

        expect(actions).toContainEqual(action);
    });
});