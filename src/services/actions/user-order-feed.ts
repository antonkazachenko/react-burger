import { createAction } from '@reduxjs/toolkit';
import {
  USER_ORDER_FEED_CLOSE,
  USER_ORDER_FEED_CONNECT,
  USER_ORDER_FEED_CONNECTING,
  USER_ORDER_FEED_DISCONNECT,
  USER_ORDER_FEED_ERROR,
  USER_ORDER_FEED_MESSAGE,
  USER_ORDER_FEED_OPEN,
  ADD_USER_MODAL_NUMBER,
  DELETE_USER_MODAL_NUMBER,
} from '../constants/user-order-feed';
import { TOrder } from '../reducers/order-feed';

type TServerResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const userOrderFeedConnect = createAction<
string,
typeof USER_ORDER_FEED_CONNECT
>(USER_ORDER_FEED_CONNECT);
export const userOrderFeedDisconnect = createAction(USER_ORDER_FEED_DISCONNECT);
export const userOrderFeedClose = createAction(USER_ORDER_FEED_CLOSE);
export const userOrderFeedOpen = createAction(USER_ORDER_FEED_OPEN);
export const userOrderFeedConnecting = createAction(USER_ORDER_FEED_CONNECTING);
export const userOrderFeedError = createAction<
string,
typeof USER_ORDER_FEED_ERROR
>(USER_ORDER_FEED_ERROR);
export const userOrderFeedMessage = createAction<
TServerResponse,
  typeof USER_ORDER_FEED_MESSAGE
>(USER_ORDER_FEED_MESSAGE);

export const addUserModalNumber = createAction<
number,
typeof ADD_USER_MODAL_NUMBER
>(ADD_USER_MODAL_NUMBER);

export const deleteUserModalNumber = createAction(DELETE_USER_MODAL_NUMBER);

export type UserOrderFeedActions = ReturnType<typeof userOrderFeedConnect>
| ReturnType<typeof userOrderFeedDisconnect>
| ReturnType<typeof userOrderFeedClose>
| ReturnType<typeof userOrderFeedOpen>
| ReturnType<typeof userOrderFeedConnecting>
| ReturnType<typeof userOrderFeedError>
| ReturnType<typeof userOrderFeedMessage>
| ReturnType<typeof addUserModalNumber>
| ReturnType<typeof deleteUserModalNumber>;
