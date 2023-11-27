import { createAction } from '@reduxjs/toolkit';
import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_CLOSE,
  ORDER_FEED_OPEN,
  ORDER_FEED_CONNECTING,
  ORDER_FEED_ERROR,
  ORDER_FEED_MESSAGE,
} from '../constants/order-feed';

interface IOrderFeedConnect {
  readonly type: typeof ORDER_FEED_CONNECT;
  payload: {
    url: string;
  };
}

export const orderFeedConnect = createAction<string, typeof ORDER_FEED_CONNECT>(ORDER_FEED_CONNECT);
export const orderFeedDisconnect = createAction(ORDER_FEED_DISCONNECT);
export const orderFeedClose = createAction(ORDER_FEED_CLOSE);
export const orderFeedOpen = createAction(ORDER_FEED_OPEN);
export const orderFeedConnecting = createAction(ORDER_FEED_CONNECTING);
export const orderFeedError = createAction<string, typeof ORDER_FEED_ERROR>(ORDER_FEED_ERROR);
export const orderFeedMessage = createAction<object, typeof ORDER_FEED_MESSAGE>(ORDER_FEED_MESSAGE);

export type OrderFeedActions = ReturnType<typeof orderFeedConnect>
| ReturnType<typeof orderFeedDisconnect>
| ReturnType<typeof orderFeedClose>
| ReturnType<typeof orderFeedOpen>
| ReturnType<typeof orderFeedConnecting>
| ReturnType<typeof orderFeedError>
| ReturnType<typeof orderFeedMessage>;
