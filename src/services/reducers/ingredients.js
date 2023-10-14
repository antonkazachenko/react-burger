import {
  ADD_INGREDIENT,
  CURRENT_ITEM_CLOSE,
  CURRENT_ITEM_OPEN,
  GET_INGREDIENTS__FAILURE,
  GET_INGREDIENTS__REQUEST,
  GET_INGREDIENTS__SUCCESS,
  POST_ORDER__FAILURE,
  POST_ORDER__REQUEST,
  POST_ORDER__SUCCESS,
  REMOVE_INGREDIENT,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  bunData: [],
  isLoading: true,
  error: null,
  constructorIngredients: [],
  createdOrder: null,
  currentItem: null,
};

// eslint-disable-next-line default-param-last
const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS__REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS__SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload.data,
        bunData: action.payload.data.filter((el) => el.type === 'bun'),
      };
    }
    case GET_INGREDIENTS__FAILURE: {
      return {
        ...state,
        ingredients: [],
        isLoading: true,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients:
          state.constructorIngredients.filter((uniqId) => uniqId !== action.payload),
      };
    }
    case POST_ORDER__REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_ORDER__SUCCESS: {
      return {
        ...state,
        isLoading: false,
        createdOrder: action.payload,
      };
    }
    case POST_ORDER__FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case CURRENT_ITEM_OPEN: {
      return {
        ...state,
        currentItem: action.payload,
      };
    }
    case CURRENT_ITEM_CLOSE: {
      return {
        ...state,
        currentItem: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;
