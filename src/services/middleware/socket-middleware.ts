import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';
import { refreshTokenRequest } from '../../utils/apiUtils';

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

export const socketMiddleware = (wsActions: TwsActionTypes, withTokenRefresh: boolean):
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
        if (
          withTokenRefresh
          && parsedData.message === 'Invalid or missing token'
        ) {
          refreshTokenRequest()
            .then((refreshData) => {
              const wssUrl = new URL(url);
              wssUrl.searchParams.set(
                'token',
                refreshData.accessToken.replace('Bearer ', ''),
              );
              dispatch({
                type: wsConnect,
                payload: wssUrl,
              });
            })
            .catch((err) => {
              dispatch({ type: onError, payload: err });
            });

          dispatch(wsDisconnect());

          return;
        }
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
