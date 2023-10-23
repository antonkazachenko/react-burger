import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import ingredientsReducer from './reducers/ingredients';
import accountReducer from './reducers/account';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
  accountStore: accountReducer,
});

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);

export default store;
