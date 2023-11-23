import request, { ApiResponse, fetchWithRefresh } from '../../utils/apiUtils';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  EMAIL_CHECK__FAILURE,
  EMAIL_CHECK__REQUEST,
  EMAIL_CHECK__RESET,
  EMAIL_CHECK__SUCCESS,
  GET_USER__FAILURE,
  GET_USER__REQUEST,
  GET_USER__RESET,
  GET_USER__SUCCESS,
  LOGIN__FAILURE,
  LOGIN__REQUEST,
  LOGIN__RESET,
  LOGIN__SUCCESS,
  LOGOUT__FAILURE,
  LOGOUT__REQUEST,
  LOGOUT__RESET,
  LOGOUT__SUCCESS,
  PROFILE_UPDATE__FAILURE,
  PROFILE_UPDATE__REQUEST,
  PROFILE_UPDATE__RESET,
  PROFILE_UPDATE__SUCCESS,
  REFRESH_TOKEN__FAILURE,
  REFRESH_TOKEN__REQUEST,
  REFRESH_TOKEN__SUCCESS,
  REFRESH_TOKEN_RESET,
  REGISTER__FAILURE,
  REGISTER__REQUEST,
  REGISTER__RESET,
  REGISTER__SUCCESS,
  RESET_PASSWORD__FAILURE,
  RESET_PASSWORD__REQUEST,
  RESET_PASSWORD__RESET,
  RESET_PASSWORD__SUCCESS,
} from '../constants/account';
import { AppDispatch } from '../store';

export type TRefreshToken = {
  refreshToken: string;
  accessToken: string;
};

export type TRefreshTokenResponse = { success: boolean } & TRefreshToken;

export interface ILoginRequestAction {
  readonly type: typeof LOGIN__REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN__SUCCESS;
  readonly payload: ApiResponse;
}

export interface ILoginFailureAction {
  readonly type: typeof LOGIN__FAILURE;
}

export interface ILoginResetAction {
  readonly type: typeof LOGIN__RESET;
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER__REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER__SUCCESS;
  readonly payload: ApiResponse;
}

export interface IRegisterFailureAction {
  readonly type: typeof REGISTER__FAILURE;
}

export interface IRegisterResetAction {
  readonly type: typeof REGISTER__RESET;
}

export interface IEmailCheckRequestAction {
  readonly type: typeof EMAIL_CHECK__REQUEST;
}

export interface IEmailCheckSuccessAction {
  readonly type: typeof EMAIL_CHECK__SUCCESS;
}

export interface IEmailCheckFailureAction {
  readonly type: typeof EMAIL_CHECK__FAILURE;
}

export interface IEmailCheckResetAction {
  readonly type: typeof EMAIL_CHECK__RESET;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD__REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD__SUCCESS;
}

export interface IResetPasswordFailureAction {
  readonly type: typeof RESET_PASSWORD__FAILURE;
}

export interface IResetPasswordResetAction {
  readonly type: typeof RESET_PASSWORD__RESET;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN__REQUEST;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN__SUCCESS;
  readonly payload: ApiResponse
}

export interface IRefreshTokenFailureAction {
  readonly type: typeof REFRESH_TOKEN__FAILURE;
}

export interface IRefreshTokenResetAction {
  readonly type: typeof REFRESH_TOKEN_RESET;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER__REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER__SUCCESS;
  readonly payload: ApiResponse;
}

export interface IGetUserFailureAction {
  readonly type: typeof GET_USER__FAILURE;
}

export interface IGetUserResetAction {
  readonly type: typeof GET_USER__RESET;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT__REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT__SUCCESS;
}

export interface ILogoutFailureAction {
  readonly type: typeof LOGOUT__FAILURE;
}

export interface ILogoutResetAction {
  readonly type: typeof LOGOUT__RESET;
}

export interface IProfileUpdateRequestAction {
  readonly type: typeof PROFILE_UPDATE__REQUEST;
}

export interface IProfileUpdateSuccessAction {
  readonly type: typeof PROFILE_UPDATE__SUCCESS;
  readonly payload: ApiResponse;
}

export interface IProfileUpdateFailureAction {
  readonly type: typeof PROFILE_UPDATE__FAILURE;
}

export interface IProfileUpdateResetAction {
  readonly type: typeof PROFILE_UPDATE__RESET;
}

export type TAccountActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | ILoginResetAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailureAction
    | IRegisterResetAction
    | IEmailCheckRequestAction
    | IEmailCheckSuccessAction
    | IEmailCheckFailureAction
    | IEmailCheckResetAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailureAction
    | IResetPasswordResetAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailureAction
    | IRefreshTokenResetAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailureAction
    | IGetUserResetAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailureAction
    | ILogoutResetAction
    | IProfileUpdateRequestAction
    | IProfileUpdateSuccessAction
    | IProfileUpdateFailureAction
    | IProfileUpdateResetAction;

export function resetPasswordReset(): IResetPasswordResetAction {
  return {
    type: RESET_PASSWORD__RESET,
  };
}

export function emailCheckReset(): IEmailCheckResetAction {
  return {
    type: EMAIL_CHECK__RESET,
  };
}

export function refreshTokenRequestAction(): IRefreshTokenRequestAction {
  return {
    type: REFRESH_TOKEN__REQUEST,
  };
}

export function refreshTokenSuccessAction(data: ApiResponse): IRefreshTokenSuccessAction {
  return {
    type: REFRESH_TOKEN__SUCCESS,
    payload: data,
  };
}

export function refreshTokenFailureAction(): IRefreshTokenFailureAction {
  return {
    type: REFRESH_TOKEN__FAILURE,
  };
}

export function getUserRequestAction(): IGetUserRequestAction {
  return {
    type: GET_USER__REQUEST,
  };
}

export function getUserSuccessAction(data: ApiResponse): IGetUserSuccessAction {
  return {
    type: GET_USER__SUCCESS,
    payload: data,
  };
}

export function getUserFailureAction(): IGetUserFailureAction {
  return {
    type: GET_USER__FAILURE,
  };
}

export function profileUpdateRequestAction(): IProfileUpdateRequestAction {
  return {
    type: PROFILE_UPDATE__REQUEST,
  };
}

export function profileUpdateSuccessAction(data: ApiResponse): IProfileUpdateSuccessAction {
  return {
    type: PROFILE_UPDATE__SUCCESS,
    payload: data,
  };
}

export function profileUpdateFailureAction(): IProfileUpdateFailureAction {
  return {
    type: PROFILE_UPDATE__FAILURE,
  };
}

export function profileLogoutRequestAction(): ILogoutRequestAction {
  return {
    type: LOGOUT__REQUEST,
  };
}

export function profileLogoutSuccessAction(): ILogoutSuccessAction {
  return {
    type: LOGOUT__SUCCESS,
  };
}

export function profileLogoutFailureAction(): ILogoutFailureAction {
  return {
    type: LOGOUT__FAILURE,
  };
}

export function resetPasswordRequestAction(): IResetPasswordRequestAction {
  return {
    type: RESET_PASSWORD__REQUEST,
  };
}

export function resetPasswordSuccessAction(): IResetPasswordSuccessAction {
  return {
    type: RESET_PASSWORD__SUCCESS,
  };
}

export function resetPasswordFailureAction(): IResetPasswordFailureAction {
  return {
    type: RESET_PASSWORD__FAILURE,
  };
}

export function loginRequestAction(): ILoginRequestAction {
  return {
    type: LOGIN__REQUEST,
  };
}

export function loginSuccessAction(data: ApiResponse): ILoginSuccessAction {
  return {
    type: LOGIN__SUCCESS,
    payload: data,
  };
}

export function loginFailureAction(): ILoginFailureAction {
  return {
    type: LOGIN__FAILURE,
  };
}

export function emailCheckRequestAction(): IEmailCheckRequestAction {
  return {
    type: EMAIL_CHECK__REQUEST,
  };
}

export function emailCheckSuccessAction(): IEmailCheckSuccessAction {
  return {
    type: EMAIL_CHECK__SUCCESS,
  };
}

export function emailCheckFailureAction(): IEmailCheckFailureAction {
  return {
    type: EMAIL_CHECK__FAILURE,
  };
}

export function registerRequestAction(): IRegisterRequestAction {
  return {
    type: REGISTER__REQUEST,
  };
}

export function registerSuccessAction(data: ApiResponse): IRegisterSuccessAction {
  return {
    type: REGISTER__SUCCESS,
    payload: data,
  };
}

export function registerFailureAction(): IRegisterFailureAction {
  return {
    type: REGISTER__FAILURE,
  };
}

export function refreshTokenRequest() {
  return function (dispatch: AppDispatch) {
    dispatch(refreshTokenRequestAction());
    return request('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getCookie('refreshToken')),
    })
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(refreshTokenSuccessAction(res));
      })
      .catch(() => {
        dispatch(refreshTokenFailureAction());
      });
  };
}

export function getUserRequest() {
  return async function (dispatch: AppDispatch) {
    dispatch(getUserRequestAction());
    await fetchWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    }, refreshTokenRequest, dispatch)
      .then((res) => {
        dispatch(getUserSuccessAction(res));
      })
      .catch(() => {
        dispatch(getUserFailureAction());
      });
  };
}

export const profileUpdateRequest = (
  name: string,
  email: string,
  password: string,
) => (dispatch: AppDispatch) => {
  dispatch(profileUpdateRequestAction());
  fetchWithRefresh('/auth/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ name, email, password }),
  }, refreshTokenRequest, dispatch)
    .then((res) => {
      dispatch(profileUpdateSuccessAction(res));
    })
    .catch(() => {
      dispatch(profileUpdateFailureAction());
    });
};

export function logoutRequest() {
  return function (dispatch: AppDispatch) {
    dispatch(profileLogoutRequestAction());
    request('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    })
      .then(() => {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch(profileLogoutSuccessAction());
      })
      .catch(() => {
        dispatch(profileLogoutFailureAction());
      });
  };
}

export function resetPasswordRequest(password: string, token: string) {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequestAction());
    fetchWithRefresh('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    }, refreshTokenRequest, dispatch)
      .then(() => {
        dispatch(resetPasswordSuccessAction());
      })
      .catch(() => {
        dispatch(resetPasswordFailureAction());
      });
  };
}

export function loginRequest(email: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequestAction());
    fetchWithRefresh('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }, refreshTokenRequest, dispatch)
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(loginSuccessAction(res));
      })
      .catch(() => {
        dispatch(loginFailureAction());
      });
  };
}

export function emailCheckRequest(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch(emailCheckRequestAction());
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch(emailCheckSuccessAction());
      })
      .catch(() => {
        dispatch(emailCheckFailureAction());
      });
  };
}

export function registerRequest(email: string, password: string, name: string) {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequestAction());
    request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(registerSuccessAction(res));
      })
      .catch(() => {
        dispatch(registerFailureAction());
      });
  };
}
