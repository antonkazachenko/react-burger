import request, { fetchWithRefresh } from '../../utils/apiUtils';
import { getCookie, setCookie } from '../../utils/cookie';

export const EMAIL_CHECK__REQUEST = 'PASSWORD_RESET__REQUEST';
export const EMAIL_CHECK__SUCCESS = 'PASSWORD_RESET__SUCCESS';
export const EMAIL_CHECK__FAILURE = 'PASSWORD_RESET__FAILURE';

export const REGISTER__REQUEST = 'REGISTER__REQUEST';
export const REGISTER__SUCCESS = 'REGISTER__SUCCESS';
export const REGISTER__FAILURE = 'REGISTER__FAILURE';

export const RESET_PASSWORD__REQUEST = 'RESET_PASSWORD__REQUEST';
export const RESET_PASSWORD__SUCCESS = 'RESET_PASSWORD__SUCCESS';
export const RESET_PASSWORD__FAILURE = 'RESET_PASSWORD__FAILURE';

export const REFRESH_TOKEN__REQUEST = 'REFRESH_TOKEN__REQUEST';
export const REFRESH_TOKEN__SUCCESS = 'REFRESH_TOKEN__SUCCESS';
export const REFRESH_TOKEN__FAILURE = 'REFRESH_TOKEN__FAILURE';

export const LOGIN__REQUEST = 'LOGIN__REQUEST';
export const LOGIN__SUCCESS = 'LOGIN__SUCCESS';
export const LOGIN__FAILURE = 'LOGIN__FAILURE';

export function loginRequest(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN__REQUEST,
    });
    fetchWithRefresh('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGIN__SUCCESS,
            payload: res,
          });
        } else {
          dispatch({
            type: LOGIN__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN__FAILURE,
        });
      });
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
        if (res.success) {
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: REFRESH_TOKEN__SUCCESS,
            payload: res,
          });
        } else {
          dispatch({
            type: REFRESH_TOKEN__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REFRESH_TOKEN__FAILURE,
        });
      });
  };
}

export function resetPasswordRequest(password) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD__REQUEST,
    });
    fetchWithRefresh('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token: getCookie('accessToken') }),
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD__SUCCESS,
            payload: password,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD__FAILURE,
        });
      });
  };
}

export function passwordResetRequest(email) {
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
      .then((res) => {
        if (res.success) {
          dispatch({
            type: EMAIL_CHECK__SUCCESS,
          });
        } else {
          dispatch({
            type: EMAIL_CHECK__FAILURE,
          });
        }
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
        if (res.success) {
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: REGISTER__SUCCESS,
            payload: res,
          });
        } else {
          dispatch({
            type: REGISTER__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER__FAILURE,
        });
      });
  };
}
