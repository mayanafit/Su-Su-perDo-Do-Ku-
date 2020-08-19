import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { sudokuReducer } from './reducers';

const reducers = combineReducers({sudokuReducer})

const store = createStore(reducers, applyMiddleware(thunk))

export default store