import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';

export type TwsActionTypes = {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshToken?: AsyncThunk<void, void, any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes):
Middleware<
object,
RootState
> => (store) => {
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;
  let url = '';

  return (next) => (action) => {
    const { dispatch } = store;
    const {
      wsConnect, wsDisconnect, wsSendMessage, onOpen,
      onClose, onError, onMessage, wsConnecting,
      refreshToken,
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
        if (parsedData.error === 'Invalid or missing token' && refreshToken) {
          dispatch(refreshToken());
        } else {
          dispatch(onMessage(parsedData));
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
