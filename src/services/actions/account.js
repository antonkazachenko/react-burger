import request, { fetchWithRefresh } from '../../utils/apiUtils';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const EMAIL_CHECK__REQUEST = 'PASSWORD_RESET__REQUEST';
export const EMAIL_CHECK__SUCCESS = 'PASSWORD_RESET__SUCCESS';
export const EMAIL_CHECK__FAILURE = 'PASSWORD_RESET__FAILURE';
export const EMAIL_CHECK__RESET = 'PASSWORD_RESET__RESET';

export const REGISTER__REQUEST = 'REGISTER__REQUEST';
export const REGISTER__SUCCESS = 'REGISTER__SUCCESS';
export const REGISTER__FAILURE = 'REGISTER__FAILURE';
export const REGISTER__RESET = 'REGISTER__RESET';

export const RESET_PASSWORD__REQUEST = 'RESET_PASSWORD__REQUEST';
export const RESET_PASSWORD__SUCCESS = 'RESET_PASSWORD__SUCCESS';
export const RESET_PASSWORD__FAILURE = 'RESET_PASSWORD__FAILURE';
export const RESET_PASSWORD__RESET = 'RESET_PASSWORD__RESET';

export const REFRESH_TOKEN__REQUEST = 'REFRESH_TOKEN__REQUEST';
export const REFRESH_TOKEN__SUCCESS = 'REFRESH_TOKEN__SUCCESS';
export const REFRESH_TOKEN__FAILURE = 'REFRESH_TOKEN__FAILURE';
export const REFRESH_TOKEN_RESET = 'REFRESH_TOKEN_RESET';

export const LOGIN__REQUEST = 'LOGIN__REQUEST';
export const LOGIN__SUCCESS = 'LOGIN__SUCCESS';
export const LOGIN__FAILURE = 'LOGIN__FAILURE';
export const LOGIN__RESET = 'LOGIN__RESET';

export const GET_USER__REQUEST = 'GET_USER__REQUEST';
export const GET_USER__SUCCESS = 'GET_USER__SUCCESS';
export const GET_USER__FAILURE = 'GET_USER__FAILURE';
export const GET_USER__RESET = 'GET_USER__RESET';

export const LOGOUT__REQUEST = 'LOGOUT__REQUEST';
export const LOGOUT__SUCCESS = 'LOGOUT__SUCCESS';
export const LOGOUT__FAILURE = 'LOGOUT__FAILURE';
export const LOGOUT__RESET = 'LOGOUT__RESET';

export const PROFILE_UPDATE__REQUEST = 'PROFILE_UPDATE__REQUEST';
export const PROFILE_UPDATE__SUCCESS = 'PROFILE_UPDATE__SUCCESS';
export const PROFILE_UPDATE__FAILURE = 'PROFILE_UPDATE__FAILURE';
export const PROFILE_UPDATE__RESET = 'PROFILE_UPDATE__RESET';

export function resetPasswordReset() {
  return {
    type: RESET_PASSWORD__RESET,
  };
}

export function emailCheckReset() {
  return {
    type: EMAIL_CHECK__RESET,
  };
}

export function registerReset() {
  return {
    type: REGISTER__RESET,
  };
}

export function refreshTokenReset() {
  return {
    type: REFRESH_TOKEN_RESET,
  };
}

export function loginReset() {
  return {
    type: LOGIN__RESET,
  };
}

export function getUserReset() {
  return {
    type: GET_USER__RESET,
  };
}

export function logoutReset() {
  return {
    type: LOGOUT__RESET,
  };
}

export function profileUpdateReset() {
  return {
    type: PROFILE_UPDATE__RESET,
  };
}

export function refreshTokenRequest() {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN__REQUEST,
    });
    request('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getCookie('refreshToken')),
    })
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: REFRESH_TOKEN__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REFRESH_TOKEN__FAILURE,
        });
      });
  };
}

export function getUserRequest() {
  return async function (dispatch) {
    dispatch({
      type: GET_USER__REQUEST,
    });
    await fetchWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    }, refreshTokenRequest, dispatch)
      .then((res) => {
        dispatch({
          type: GET_USER__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER__FAILURE,
        });
      });
  };
}

export const profileUpdateRequest = (name, email, password) => (dispatch) => {
  dispatch({
    type: PROFILE_UPDATE__REQUEST,
  });
  fetchWithRefresh('/auth/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ name, email, password }),
  }, refreshTokenRequest, dispatch)
    .then((res) => {
      dispatch({
        type: PROFILE_UPDATE__SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: PROFILE_UPDATE__FAILURE,
      });
    });
};

export function logoutRequest() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT__REQUEST,
    });
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
        dispatch({
          type: LOGOUT__SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT__FAILURE,
        });
      });
  };
}

export function resetPasswordRequest(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD__REQUEST,
    });
    fetchWithRefresh('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    }, refreshTokenRequest, dispatch)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD__SUCCESS,
          payload: password,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD__FAILURE,
        });
      });
  };
}

export function loginRequest(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN__REQUEST,
    });
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
        dispatch({
          type: LOGIN__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN__FAILURE,
        });
      });
  };
}

export function emailCheckRequest(email) {
  return function (dispatch) {
    dispatch({
      type: EMAIL_CHECK__REQUEST,
    });
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch({
          type: EMAIL_CHECK__SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: EMAIL_CHECK__FAILURE,
        });
      });
  };
}

export function registerRequest(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER__REQUEST,
    });
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
        dispatch({
          type: REGISTER__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER__FAILURE,
        });
      });
  };
}
