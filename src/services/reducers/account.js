import {
  EMAIL_CHECK__FAILURE,
  EMAIL_CHECK__REQUEST,
  EMAIL_CHECK__SUCCESS,
  REGISTER__FAILURE,
  REGISTER__REQUEST,
  REGISTER__SUCCESS,
} from '../actions/account';

const initialState = {
  passwordResetRequest: {
    success: false,
    error: false,
  },
  registerRequest: {
    success: false,
    error: false,
  },
  user: {
    name: '',
    email: '',
  },
  accessToken: '',
  refreshToken: '',
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHECK__REQUEST: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__SUCCESS: {
      return {
        ...state,
        passwordResetRequest: {
          success: true,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__FAILURE: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: true,
        },
      };
    }
    case REGISTER__REQUEST: {
      return {
        ...state,
        registerRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REGISTER__SUCCESS: {
      return {
        ...state,
        registerRequest: {
          success: true,
          error: false,
        },
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case REGISTER__FAILURE: {
      return {
        ...state,
        registerRequest: {
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
