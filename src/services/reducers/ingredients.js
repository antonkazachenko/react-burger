import {
  ADD_INGREDIENT, CHANGE_BUN,
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
  modalVisible: false,
  currentItem: null,
  orderModalVisible: false,
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
        bunData: action.payload.data.filter((el) => el.type === 'bun')[0],
      };
    }
    case GET_INGREDIENTS__FAILURE: {
      return {
        ...state,
        ingredients: [],
        isLoading: true,
      };
    }
    case CHANGE_BUN: {
      return {
        ...state,
        bunData: action.payload,
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
        // eslint-disable-next-line no-underscore-dangle
          state.constructorIngredients.filter((el) => el._id !== action.payload),
      };
    }
    case POST_ORDER__REQUEST: {
      return {
        ...state,
        modalVisible: false,
      };
    }
    case POST_ORDER__SUCCESS: {
      return {
        ...state,
        isLoading: false,
        createdOrder: action.payload,
        modalVisible: true,
      };
    }
    case POST_ORDER__FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalVisible: false,
      };
    }
    case CURRENT_ITEM_OPEN: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          currentItem: action.payload,
        };
      }
      return {
        ...state,
        currentItem: action.payload,
        modalVisible: true,
      };
    }
    case CURRENT_ITEM_CLOSE: {
      return {
        ...state,
        currentItem: null,
        modalVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;
