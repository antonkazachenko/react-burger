import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import ingredientsReducer from './reducers/ingredients';
import accountReducer from './reducers/account';
import { TIngredientsActions } from './actions/ingredients';
import { TAccountActions } from './actions/account';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
  accountStore: accountReducer,
});

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);

type TApplicationActions = TIngredientsActions | TAccountActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> =
  (constructorIngredients: string[]) => (dispatch: AppDispatch) => ReturnType;

export default store;
