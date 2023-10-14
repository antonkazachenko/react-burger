import { combineReducers, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: [composeEnhancers()],
});

export default store;
