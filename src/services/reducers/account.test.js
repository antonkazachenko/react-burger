import * as types from '../constants/account';
import accountReducer from './account';

describe('account reducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return the initial state', () => {
    expect(accountReducer(undefined, {})).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle GET_USER__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.GET_USER__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle GET_USER__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.GET_USER__SUCCESS,
          payload: {
            user: {
              name: 'test',
              email: 'test',
            },
          },
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: true,
        error: false,
      },
      user: {
        name: 'test',
        email: 'test',
      },
    });
  });
  it('should handle GET_USER__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.GET_USER__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: true,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle GET_USER__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.GET_USER__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle PROFILE_UPDATE__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.PROFILE_UPDATE__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle PROFILE_UPDATE__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.PROFILE_UPDATE__SUCCESS,
          payload: {
            user: {
              name: 'test',
              email: 'test',
            },
          },
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: true,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: 'test',
        email: 'test',
      },
    });
  });
  it('should handle PROFILE_UPDATE__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.PROFILE_UPDATE__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: true,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle PROFILE_UPDATE__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.PROFILE_UPDATE__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle LOGOUT__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGOUT__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle LOGOUT__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGOUT__SUCCESS,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: true,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle LOGOUT__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGOUT__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: true,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle LOGOUT__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGOUT__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: {
        success: false,
        error: false,
      },
      passwordResetRequest: {
        success: false,
        error: false,
      },
      registerRequest: {
        success: false,
        error: false,
      },
      refreshTokenRequest: {
        success: false,
        error: false,
      },
      loginRequest: {
        success: false,
        error: false,
      },
      logoutRequest: {
        success: false,
        error: false,
      },
      profileUpdateRequest: {
        success: false,
        error: false,
      },
      getUserRequest: {
        success: false,
        error: false,
      },
      user: {
        name: '',
        email: '',
      },
    });
  });
  it('should handle LOGIN__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGIN__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle LOGIN__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGIN__SUCCESS,
          payload: {
            user: {
              name: 'test',
              email: 'test',
            },
          },
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: true, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: 'test', email: 'test' },
    });
  });
  it('should handle LOGIN__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGIN__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: true },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle LOGIN__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.LOGIN__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REFRESH_TOKEN__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REFRESH_TOKEN__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REFRESH_TOKEN__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REFRESH_TOKEN__SUCCESS,
          payload: {
            user: {
              name: 'test',
              email: 'test',
            },
          },
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: true, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REFRESH_TOKEN__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REFRESH_TOKEN__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: true },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REFRESH_TOKEN_RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REFRESH_TOKEN_RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REGISTER__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REGISTER__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REGISTER__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REGISTER__SUCCESS,
          payload: {
            user: {
              name: 'test',
              email: 'test',
            },
          },
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: true, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: 'test', email: 'test' },
    });
  });
  it('should handle REGISTER__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REGISTER__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: true },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle REGISTER__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.REGISTER__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle RESET_PASSWORD__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.RESET_PASSWORD__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle RESET_PASSWORD__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.RESET_PASSWORD__SUCCESS,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: true, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle RESET_PASSWORD__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.RESET_PASSWORD__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: true },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle RESET_PASSWORD__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.RESET_PASSWORD__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle EMAIL_CHECK__REQUEST', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.EMAIL_CHECK__REQUEST,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle EMAIL_CHECK__SUCCESS', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.EMAIL_CHECK__SUCCESS,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: true, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle EMAIL_CHECK__FAILURE', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.EMAIL_CHECK__FAILURE,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: true },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
  it('should handle EMAIL_CHECK__RESET', () => {
    expect(
      accountReducer(
        undefined,
        {
          type: types.EMAIL_CHECK__RESET,
        },
      ),
    ).toEqual({
      emailCheckRequest: { success: false, error: false },
      passwordResetRequest: { success: false, error: false },
      registerRequest: { success: false, error: false },
      getUserRequest: { success: false, error: false },
      refreshTokenRequest: { success: false, error: false },
      loginRequest: { success: false, error: false },
      logoutRequest: { success: false, error: false },
      profileUpdateRequest: { success: false, error: false },
      user: { name: '', email: '' },
    });
  });
});
