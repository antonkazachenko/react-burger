import { createReducer } from '@reduxjs/toolkit';
import WebsocketStatus from '../../types/websocket';
import RequestStatus from '../../types/requestStatus';
import { TOrderFeedState } from './order-feed';
import {
  userOrderFeedClose,
  userOrderFeedConnect,
  userOrderFeedConnecting,
  userOrderFeedDisconnect,
  userOrderFeedError,
  userOrderFeedMessage,
  userOrderFeedOpen,
} from '../actions/user-order-feed';

const initialState: TOrderFeedState &
{ refreshTokenStatus: RequestStatus; userModalNumber: number; } = {
  status: WebsocketStatus.OFFLINE,
  orderPageStatus: RequestStatus.IDLE,
  refreshTokenStatus: RequestStatus.IDLE,
  orders: [],
  orderPage: [],
  error: '',
  total: 0,
  totalToday: 0,
  userModalNumber: 0,
};

const userOrderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userOrderFeedConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(userOrderFeedConnect, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(userOrderFeedDisconnect, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(userOrderFeedOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(userOrderFeedClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(userOrderFeedError, (state, action) => {
      state.error = action.payload;
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(userOrderFeedMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});

export default userOrderFeedReducer;
