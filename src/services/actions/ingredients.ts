// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import request, { ApiResponse } from '../../utils/apiUtils';
import { TItemType } from '../../types';
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
  RESET_CONSTRUCTOR,
  SET_TOTAL_PRICE,
} from '../constants/ingredients';
import { AppDispatch, AppThunk } from '../store';
import { getCookie } from '../../utils/cookie';

export type TItemTypeWithUniqueId = TItemType & { uniqueId: string };

export type TIngredientIndexes = {
  newIndex: number;
  oldIndex: number;
};

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
  readonly payload: TIngredientIndexes;
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

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export interface ICreatedOrderRequestAction {
  readonly type: typeof POST_ORDER__REQUEST;
}

export interface ICreatedOrderSuccessAction {
  readonly type: typeof POST_ORDER__SUCCESS;
  readonly payload: {
    success: boolean;
    name: string;
    order: {
      ingredients: TItemType[];
      _id: string;
      owner: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
      status: string;
      number: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      price: number;
    };
  };
}

export interface ICreatedOrderFailureAction {
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
    | IPostOrderFailureAction
    | IResetConstructorAction;

export const resetConstructor = (): IResetConstructorAction => ({
  type: RESET_CONSTRUCTOR,
});

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
  payload: TIngredientIndexes,
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

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS__REQUEST,
});

export const getIngredientsSuccess = (
  payload: TItemType[],
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS__SUCCESS,
  payload,
});

export const getIngredientsFailure = (payload: Error): IGetIngredientsFailureAction => ({
  type: GET_INGREDIENTS__FAILURE,
  payload,
});

const createdOrderRequest = (): ICreatedOrderRequestAction => ({
  type: POST_ORDER__REQUEST,
});

const createdOrderSuccess = (apiResponse: ApiResponse): ICreatedOrderSuccessAction => ({
  type: POST_ORDER__SUCCESS,
  payload: {
    success: apiResponse.success,
    name: apiResponse.name,
    order: apiResponse.order,
  },
});
export const getIngredients: AppThunk = () => function (dispatch: AppDispatch) {
  dispatch(getIngredientsRequest());
  request('/ingredients')
    .then((data) => {
      dispatch(getIngredientsSuccess(data.data));
    })
    .catch((err) => {
      dispatch(getIngredientsFailure(err));
    });
};

export const postOrderRequest = (): IPostOrderRequestAction => ({
  type: POST_ORDER__REQUEST,
});

export const createOrderRequest: AppThunk = (
  constructorIngredients: string[],
) => function (dispatch: AppDispatch) {
  // Start the API call by dispatching a request action
  dispatch(createdOrderRequest());

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
      dispatch(createdOrderSuccess(res));
    })
    .catch(() => {
      dispatch(postOrderRequest());
    });
};
