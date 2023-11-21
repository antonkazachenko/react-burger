// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'react';
import request from '../../utils/apiUtils';
import { TItemType, TDraggableIngredientItem, THandleItem } from '../../types';
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

export const addIngredient = (item: TItemType) => ({
  type: ADD_INGREDIENT,
  payload: {
    ...item,
    uniqueId: uuidv4(),
  },
});

export const removeIngredient = (id: string) => ({
  type: REMOVE_INGREDIENT,
  payload: id,
});

export const changeBun = (item: TItemType) => ({
  type: CHANGE_BUN,
  payload: item,
});

export const reorderIngredients = (payload: TDraggableIngredientItem) => ({
  type: REORDER_INGREDIENTS,
  payload,
});

export const setCurrentItemOpen = (item: THandleItem) => ({
  type: CURRENT_ITEM_OPEN,
  payload: item,
});

export const setCurrentItemClose = () => ({
  type: CURRENT_ITEM_CLOSE,
});

export const setTotalPrice = (price: number) => ({
  type: SET_TOTAL_PRICE,
  payload: price,
});

export const resetTotalPrice = () => ({
  type: RESET_TOTAL_PRICE,
});

export function getIngredients() {
  return function (dispatch: Dispatch<any>) {
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

export function createOrderRequest(constructorIngredients) {
  return function (dispatch) {
    // Start the API call by dispatching a request action
    dispatch({ type: POST_ORDER__REQUEST });

    return request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
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
