import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({ ...reducers });

export default createStore(reducer, applyMiddleware(thunk))