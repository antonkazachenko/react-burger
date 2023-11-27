import type { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TWsActions = {
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

export const socketMiddleware = (wsActions: TWsActions): Middleware<object, RootState> => (
  (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return () => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;
      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
          isConnected = true;
          dispatch(wsConnecting());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
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

        if (wsSendMessage?.match(action)) {
          const { payload } = action;
          const message = { ...(payload) };
          socket.send(JSON.stringify(message));
        }

        if (wsDisconnect.match(action)) {
          isConnected = false;
          socket.close(1000);
          clearTimeout(reconnectTimer);
        }
      }
    };
  }) as Middleware;
