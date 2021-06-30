import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import State from './reducers';

export const store = createStore(State, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof State>;
