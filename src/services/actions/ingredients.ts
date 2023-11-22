// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import request from '../../utils/apiUtils';
import { TDraggableIngredientItem, TItemType } from '../../types';
import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  CURRENT_ITEM_CLOSE,
  CURRENT_ITEM_OPEN,
  GET_INGREDIENTS__FAILURE,
  GET_INGREDIENTS__REQUEST,
  GET_INGREDIENTS__SUCCESS,
  POST_ORDER__FAILURE,
  POST_ORDER__REQUEST,
  POST_ORDER__SUCCESS,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  RESET_TOTAL_PRICE,
  SET_TOTAL_PRICE,
} from '../constants/ingredients';
import { AppDispatch } from '../store';
import { getCookie } from '../../utils/cookie';

export type TItemTypeWithUniqueId = TItemType & { uniqueId: string };

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TItemTypeWithUniqueId;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: string;
}

export interface IChangeBunAction {
    readonly type: typeof CHANGE_BUN;
    readonly payload: TItemType;
}

export interface IReorderIngredientsAction {
    readonly type: typeof REORDER_INGREDIENTS;
    readonly payload: TDraggableIngredientItem;
}

export interface ISetCurrentItemOpenAction {
    readonly type: typeof CURRENT_ITEM_OPEN;
    readonly payload: TItemType;
}

export interface ISetCurrentItemCloseAction {
    readonly type: typeof CURRENT_ITEM_CLOSE;
}

export interface ISetTotalPriceAction {
    readonly type: typeof SET_TOTAL_PRICE;
    readonly payload: number;
}

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS__REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS__SUCCESS;
    readonly payload: TItemType[];
}

export interface IGetIngredientsFailureAction {
    readonly type: typeof GET_INGREDIENTS__FAILURE;
    readonly payload: Error;
}

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER__REQUEST;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER__SUCCESS;
    readonly payload: {
        success: boolean;
        name: string;
        order: {
            number: number;
        };
    };
}

export interface IPostOrderFailureAction {
    readonly type: typeof POST_ORDER__FAILURE;
    readonly payload: Error;
}

export type TIngredientsActions =
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IChangeBunAction
    | IReorderIngredientsAction
    | ISetCurrentItemOpenAction
    | ISetCurrentItemCloseAction
    | ISetTotalPriceAction
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailureAction
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailureAction;

export interface IResetTotalPriceAction {
    readonly type: typeof RESET_TOTAL_PRICE;
}

export const addIngredient = (item: TItemType): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: {
    ...item,
    uniqueId: uuidv4(),
  },
});

export const removeIngredient = (id: string): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  payload: id,
});

export const changeBun = (item: TItemType): IChangeBunAction => ({
  type: CHANGE_BUN,
  payload: item,
});

export const reorderIngredients = (
  payload: TDraggableIngredientItem,
): IReorderIngredientsAction => ({
  type: REORDER_INGREDIENTS,
  payload,
});

export const setCurrentItemOpen = (item: TItemType): ISetCurrentItemOpenAction => ({
  type: CURRENT_ITEM_OPEN,
  payload: item,
});

export const setCurrentItemClose = (): ISetCurrentItemCloseAction => ({
  type: CURRENT_ITEM_CLOSE,
});

export const setTotalPrice = (price: number): ISetTotalPriceAction => ({
  type: SET_TOTAL_PRICE,
  payload: price,
});

export const resetTotalPrice = (): IResetTotalPriceAction => ({
  type: RESET_TOTAL_PRICE,
});

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_INGREDIENTS__REQUEST });
    return request('/ingredients')
      .then((data) => {
        dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS__FAILURE, payload: err });
      });
  };
}

export function createOrderRequest(constructorIngredients: string[]) {
  return function (dispatch: AppDispatch) {
    // Start the API call by dispatching a request action
    dispatch({ type: POST_ORDER__REQUEST });

    return request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        ingredients: constructorIngredients,
      }),
    })
      .then((res) => {
        dispatch({ type: POST_ORDER__SUCCESS, payload: res });
        return res;
      })
      .catch((err) => {
        dispatch({ type: POST_ORDER__FAILURE, payload: err });
        console.log(err);
      });
  };
}
