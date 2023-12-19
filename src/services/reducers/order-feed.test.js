import * as types from '../constants/order-feed';
import orderFeedReducer from './order-feed';
import WebsocketStatus from '../../types/websocket';
import RequestStatus from '../../types/requestStatus';
import { getOrderByID } from '../actions/order-feed';

describe('orderFeedReducer', () => {
  it('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      orderPageStatus: RequestStatus.IDLE,
      orders: [],
      orderPage: [],
      error: '',
      total: 0,
      totalToday: 0,
      modalNumber: 0,
    });
  });
  it('should handle ORDER_FEED_CONNECTING', () => {
    expect(
      orderFeedReducer({}, {
        type: types.ORDER_FEED_CONNECTING,
      }),
    ).toEqual({
      status: WebsocketStatus.CONNECTING,
    });
  });
  it('should handle ORDER_FEED_OPEN', () => {
    expect(
      orderFeedReducer({}, {
        type: types.ORDER_FEED_OPEN,
      }),
    ).toEqual({
      status: WebsocketStatus.ONLINE,
    });
  });
  it('should handle ORDER_FEED_CLOSE', () => {
    expect(
      orderFeedReducer({}, {
        type: types.ORDER_FEED_CLOSE,
      }),
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
    });
  });
  it('should handle ORDER_FEED_ERROR', () => {
    expect(
      orderFeedReducer({}, {
        type: types.ORDER_FEED_ERROR,
        payload: 'error',
      }),
    ).toEqual({
      error: 'error',
    });
  });
  it('should handle ORDER_FEED_MESSAGE', () => {
    expect(
      orderFeedReducer({}, {
        type: types.ORDER_FEED_MESSAGE,
        payload: {
          orders: [],
          total: 0,
          totalToday: 0,
        },
      }),
    ).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
    });
    expect(
      orderFeedReducer({
        orders: [],
        total: 0,
        totalToday: 0,
      }, {
        type: types.ORDER_FEED_MESSAGE,
        payload: {
          orders: [{
            id: 1,
          }],
          total: 1,
          totalToday: 1,
        },
      }),
    ).toEqual({
      orders: [{
        id: 1,
      }],
      total: 1,
      totalToday: 1,
    });
    expect(
      orderFeedReducer({
        orders: [{
          id: 1,
        }],
        total: 1,
        totalToday: 1,
      }, {
        type: types.ORDER_FEED_MESSAGE,
        payload: {
          orders: [{
            id: 2,
          }],
          total: 2,
          totalToday: 2,
        },
      }),
    ).toEqual({
      orders: [{
        id: 2,
      }],
      total: 2,
      totalToday: 2,
    });
  });
  it('should handle orderFeed/getOrderById.pending', () => {
    expect(
      orderFeedReducer({}, {
        type: getOrderByID.pending,
      }),
    ).toEqual({
      orderPageStatus: RequestStatus.LOADING,
    });
  });
  it('should handle orderFeed/getOrderById.fulfilled', () => {
    expect(
      orderFeedReducer({}, {
        type: getOrderByID.fulfilled,
        payload: {
          orders: [{
            id: 1,
          }],
        },
      }),
    ).toEqual({
      orderPageStatus: RequestStatus.SUCCEEDED,
      orderPage: [{
        id: 1,
      }],
    });
  });
  it('should handle orderFeed/getOrderById.rejected', () => {
    expect(
      orderFeedReducer({}, {
        type: getOrderByID.rejected,
        payload: {
          message: 'error',
        },
      }),
    ).toEqual({
      orderPageStatus: RequestStatus.FAILED,
      error: 'error',
    });
  });
});
