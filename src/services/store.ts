import {
  Action,
  ActionCreator,
  applyMiddleware, combineReducers, compose, createStore, Dispatch,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
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

type TApplicationActions = TIngredientsActions & TAccountActions;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export default store;
