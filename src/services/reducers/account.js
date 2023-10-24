import {
  EMAIL_CHECK__FAILURE,
  EMAIL_CHECK__REQUEST,
  EMAIL_CHECK__SUCCESS,
  REGISTER__FAILURE,
  REGISTER__REQUEST,
  REGISTER__SUCCESS,
  RESET_PASSWORD__FAILURE,
  RESET_PASSWORD__REQUEST,
  RESET_PASSWORD__SUCCESS,
  REFRESH_TOKEN__SUCCESS,
  REFRESH_TOKEN__FAILURE,
  REFRESH_TOKEN__REQUEST,
} from '../actions/account';

const initialState = {
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
        emailCheckRequest: {
          success: false,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__SUCCESS: {
      return {
        ...state,
        emailCheckRequest: {
          success: true,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__FAILURE: {
      return {
        ...state,
        emailCheckRequest: {
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
    case RESET_PASSWORD__REQUEST: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: false,
        },
      };
    }
    case RESET_PASSWORD__SUCCESS: {
      return {
        ...state,
        passwordResetRequest: {
          success: true,
          error: false,
        },
        user: {
          ...state.user,
          password: action.payload,
        },
      };
    }
    case RESET_PASSWORD__FAILURE: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: true,
        },
      };
    }
    case REFRESH_TOKEN__REQUEST: {
      return {
        ...state,
        refreshTokenRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REFRESH_TOKEN__SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: {
          success: true,
          error: false,
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case REFRESH_TOKEN__FAILURE: {
      return {
        ...state,
        refreshTokenRequest: {
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
