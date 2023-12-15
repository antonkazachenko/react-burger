import * as types from '../constants/account';
import accountReducer from './account';

describe('account reducer', () => {
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
});
