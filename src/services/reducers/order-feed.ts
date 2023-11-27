import { createReducer } from '@reduxjs/toolkit';
import WebsocketStatus from '../../types/websocket';
import {
  orderFeedClose,
  orderFeedConnecting,
  orderFeedError,
  orderFeedMessage,
  orderFeedOpen,
} from '../actions/order-feed';

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

type TOrderFeedState = {
  status: WebsocketStatus;
  orders: TOrder[];
  error: string;
  total: number;
  totalToday: number;
}

const initialState: TOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: '',
  total: 0,
  totalToday: 0,
};

const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(orderFeedConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(orderFeedOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(orderFeedClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(orderFeedError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(orderFeedMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});

export default orderFeedReducer;
