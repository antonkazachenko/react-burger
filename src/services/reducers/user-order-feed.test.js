import * as types from '../constants/user-order-feed';
import userOrderFeedReducer from './user-order-feed';
import WebsocketStatus from '../../types/websocket';
import RequestStatus from '../../types/requestStatus';

describe('orderFeedReducer', () => {
  it('should return the initial state', () => {
    expect(userOrderFeedReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      orderPageStatus: RequestStatus.IDLE,
      refreshTokenStatus: RequestStatus.IDLE,
      orders: [],
      orderPage: [],
      error: '',
      total: 0,
      totalToday: 0,
      userModalNumber: 0,
    });
  });
  it('should handle USER_ORDER_FEED_CONNECTING', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_CONNECTING,
      }),
    ).toEqual({
      status: WebsocketStatus.CONNECTING,
    });
  });
  it('should handle USER_ORDER_FEED_CONNECT', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_CONNECT,
      }),
    ).toEqual({
      status: WebsocketStatus.CONNECTING,
    });
  });
  it('should handle USER_ORDER_FEED_DISCONNECT', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_DISCONNECT,
      }),
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
    });
  });
  it('should handle USER_ORDER_FEED_OPEN', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_OPEN,
      }),
    ).toEqual({
      status: WebsocketStatus.ONLINE,
    });
  });
  it('should handle USER_ORDER_FEED_CLOSE', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_CLOSE,
      }),
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
    });
  });
  it('should handle USER_ORDER_FEED_ERROR', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_ERROR,
        payload: 'error',
      }),
    ).toEqual({
      error: 'error',
      status: WebsocketStatus.OFFLINE,
    });
  });
  it('should handle USER_ORDER_FEED_MESSAGE', () => {
    expect(
      userOrderFeedReducer({}, {
        type: types.USER_ORDER_FEED_MESSAGE,
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
      userOrderFeedReducer({
        orders: [],
        total: 0,
        totalToday: 0,
      }, {
        type: types.USER_ORDER_FEED_MESSAGE,
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
      userOrderFeedReducer({
        orders: [{
          id: 1,
        }],
        total: 1,
        totalToday: 1,
      }, {
        type: types.USER_ORDER_FEED_MESSAGE,
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
});
