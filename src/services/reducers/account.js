import {
  PASSWORD_RESET__REQUEST,
  PASSWORD_RESET__SUCCESS,
  PASSWORD_RESET__FAILURE,
} from '../actions/account';

const initialState = {
  passwordResetRequest: {
    success: false,
    error: false,
  },
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET__REQUEST: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: false,
        },
      };
    }
    case PASSWORD_RESET__SUCCESS: {
      return {
        ...state,
        passwordResetRequest: {
          success: true,
          error: false,
        },
      };
    }
    case PASSWORD_RESET__FAILURE: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
