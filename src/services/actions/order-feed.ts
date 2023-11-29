import { createAction } from '@reduxjs/toolkit';
import { TOrder } from '../reducers/order-feed';

import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_CLOSE,
  ORDER_FEED_OPEN,
  ORDER_FEED_CONNECTING,
  ORDER_FEED_ERROR,
  ORDER_FEED_MESSAGE,
  GET_ORDER_BY_ID__FAILURE,
  GET_ORDER_BY_ID__REQUEST,
  GET_ORDER_BY_ID__SUCCESS,
} from '../constants/order-feed';
import { AppDispatch, AppThunk } from '../store';
import request from '../../utils/apiUtils';
import { getIngredientsFailure, getIngredientsSuccess } from './ingredients';

type TServerResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

interface IGetOrderByIdAction {
  readonly type: typeof GET_ORDER_BY_ID__REQUEST,
}

interface IGetOrderByIdSuccess {
  readonly type: typeof GET_ORDER_BY_ID__SUCCESS,
  readonly payload: TServerResponse,
}

interface IGetOrderByIdFailure {
  readonly type: typeof GET_ORDER_BY_ID__FAILURE,
  readonly payload: Error,
}

export const getOrderByIdRequestAction = (): IGetOrderByIdAction => ({
  type: GET_ORDER_BY_ID__REQUEST,
});

export const getOrderByIdSuccessAction = (data: TServerResponse): IGetOrderByIdSuccess => ({
  type: GET_ORDER_BY_ID__SUCCESS,
  payload: data,
});

export const getOrderByIdFailureAction = (err: Error): IGetOrderByIdFailure => ({
  type: GET_ORDER_BY_ID__FAILURE,
  payload: err,
});

export const orderFeedConnect = createAction<string, typeof ORDER_FEED_CONNECT>(ORDER_FEED_CONNECT);
export const orderFeedDisconnect = createAction(ORDER_FEED_DISCONNECT);
export const orderFeedClose = createAction(ORDER_FEED_CLOSE);
export const orderFeedOpen = createAction(ORDER_FEED_OPEN);
export const orderFeedConnecting = createAction(ORDER_FEED_CONNECTING);
export const orderFeedError = createAction<string, typeof ORDER_FEED_ERROR>(ORDER_FEED_ERROR);
export const orderFeedMessage = createAction<
TServerResponse,
typeof ORDER_FEED_MESSAGE
>(ORDER_FEED_MESSAGE);

export const getIngredients: AppThunk = (orderNumber) => function (dispatch: AppDispatch) {
  dispatch(getOrderByIdRequestAction());
  request(`/orders/${orderNumber}`)
    .then((data) => {
      dispatch(getIngredientsSuccess(data.data));
    })
    .catch((err) => {
      dispatch(getIngredientsFailure(err));
    });
};

export type OrderFeedActions = ReturnType<typeof orderFeedConnect>
| ReturnType<typeof orderFeedDisconnect>
| ReturnType<typeof orderFeedClose>
| ReturnType<typeof orderFeedOpen>
| ReturnType<typeof orderFeedConnecting>
| ReturnType<typeof orderFeedError>
| ReturnType<typeof orderFeedMessage>
| ReturnType<typeof getOrderByIdRequestAction>
| ReturnType<typeof getOrderByIdSuccessAction>
| ReturnType<typeof getOrderByIdFailureAction>;
