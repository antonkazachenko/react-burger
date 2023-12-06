import { createReducer } from '@reduxjs/toolkit';
import WebsocketStatus from '../../types/websocket';
import RequestStatus from '../../types/requestStatus';
import {
  orderFeedClose,
  orderFeedConnecting,
  orderFeedError,
  orderFeedMessage,
  orderFeedOpen,
  getOrderByID,
} from '../actions/order-feed';

export type TOrder = {
  ingredients: string[];
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderFeedState = {
  status: WebsocketStatus;
  orderPageStatus: RequestStatus;
  orders: TOrder[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderPage: TOrder[];
  error: string;
  total: number;
  totalToday: number;
}

const initialState: TOrderFeedState & { modalNumber: number } = {
  status: WebsocketStatus.OFFLINE,
  orderPageStatus: RequestStatus.IDLE,
  orders: [],
  orderPage: [],
  error: '',
  total: 0,
  totalToday: 0,
  modalNumber: 0,
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
    })
    .addCase(getOrderByID.pending, (state) => {
      state.orderPageStatus = RequestStatus.LOADING;
    })
    .addCase(getOrderByID.fulfilled, (state, action) => {
      state.orderPage = action.payload.orders;
      state.orderPageStatus = RequestStatus.SUCCEEDED;
    })
    .addCase(getOrderByID.rejected, (state, action) => {
      state.error = (action.payload as Error).message;
      state.orderPageStatus = RequestStatus.FAILED;
    });
});

export default orderFeedReducer;
