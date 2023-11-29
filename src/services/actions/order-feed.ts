import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../reducers/order-feed';

import {
  ORDER_FEED_CLOSE,
  ORDER_FEED_CONNECT,
  ORDER_FEED_CONNECTING,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_ERROR,
  ORDER_FEED_MESSAGE,
  ORDER_FEED_OPEN,
} from '../constants/order-feed';
import request, { ApiResponse } from '../../utils/apiUtils';

type TServerResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TRequestResponse = {
  success: boolean;
  orders: TOrder[];
};

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

export const getOrderByID = createAsyncThunk<
TRequestResponse,
string,
{
  rejectValue: unknown
}
>(
  'orderFeed/getOrderById',
  async (orderNumber, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await request(`/orders/${orderNumber}`);
      return {
        success: response.success,
        orders: response.orders,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export type OrderFeedActions = ReturnType<typeof orderFeedConnect>
| ReturnType<typeof orderFeedDisconnect>
| ReturnType<typeof orderFeedClose>
| ReturnType<typeof orderFeedOpen>
| ReturnType<typeof orderFeedConnecting>
| ReturnType<typeof orderFeedError>
| ReturnType<typeof orderFeedMessage>
| ReturnType<typeof getOrderByID.pending>
| ReturnType<typeof getOrderByID.fulfilled>
| ReturnType<typeof getOrderByID.rejected>;
