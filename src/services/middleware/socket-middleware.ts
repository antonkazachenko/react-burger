import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  AnyAction,
  AsyncThunk,
  AsyncThunkAction,
  Dispatch as ReduxDispatch,
} from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';

export type TBaseWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wsSendMessage?: ActionCreatorWithPayload<any>,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage: ActionCreatorWithPayload<any>,
}

export type TExtendedWsActionTypes = TBaseWsActionTypes & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshToken?: AsyncThunk<void, void, any>,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dispatch = <T extends AnyAction | AsyncThunkAction<any, any, any>>(action: T) => T;

// eslint-disable-next-line max-len
export const socketMiddleware = <T extends TBaseWsActionTypes | TExtendedWsActionTypes>(wsActions: T): Middleware<object, RootState, ReduxDispatch<AnyAction>> => (store) => {
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;
  let url = '';

  return (next) => (action) => {
    const { dispatch } = store;
    const {
      wsConnect, wsDisconnect, wsSendMessage, onOpen,
      onClose, onError, onMessage, wsConnecting,
    } = wsActions;

    if (wsConnect.match(action)) {
      url = action.payload;
      socket = new WebSocket(url);
      isConnected = true;
      dispatch(wsConnecting());
    }

    if (socket) {
      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onclose = (event) => {
        if (event.code !== 1000) {
          dispatch(onError(event.code.toString()));
        }
        dispatch(onClose());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        dispatch(onMessage(parsedData));
        if ('refreshToken' in wsActions && parsedData.error === 'Invalid or missing token') {
          if (wsActions.refreshToken) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            store.dispatch(wsActions.refreshToken() as any);
          }
        } else if (wsActions.onMessage) {
          store.dispatch(wsActions.onMessage(parsedData));
        }
      };

      socket.onclose = (event) => {
        if (event.code !== 1000) {
          dispatch(onError(event.code.toString()));
        }
        dispatch(onClose());

        if (isConnected) {
          dispatch(wsConnecting());
          reconnectTimer = window.setTimeout(() => {
            dispatch(wsConnect(url));
          }, 3000);
        }
      };

      if (wsSendMessage && wsSendMessage.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (wsDisconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        dispatch(onClose());
      }
    }

    next(action);
  };
};
