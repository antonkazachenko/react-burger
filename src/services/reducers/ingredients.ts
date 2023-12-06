// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  CURRENT_ITEM_CLOSE,
  CURRENT_ITEM_OPEN, GET_INGREDIENTS__FAILURE, GET_INGREDIENTS__REQUEST, GET_INGREDIENTS__SUCCESS,
  POST_ORDER__FAILURE,
  POST_ORDER__REQUEST,
  POST_ORDER__SUCCESS,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  RESET_CONSTRUCTOR,
  SET_TOTAL_PRICE,
} from '../constants/ingredients';
import { TIngredientsActions, TItemTypeWithUniqueId } from '../actions/ingredients';
import { TItemType } from '../../types';

export type TCreatedOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

type TIngredientsState = {
  ingredients: Array<TItemType>,
  bunData: TItemType | null,
  isLoading: boolean,
  error: null | Error,
  constructorIngredients: Array<{ ingredient: TItemTypeWithUniqueId }>,
  createdOrder: null | TCreatedOrder,
  currentItem: null | TItemType,
  totalPrice: number,
  isLoadingOrder: boolean,
  orderModalVisible: boolean,
};

const initialState = {
  ingredients: [],
  bunData: null,
  isLoading: true,
  error: null,
  constructorIngredients: [],
  createdOrder: null,
  currentItem: null,
  totalPrice: 0,
  isLoadingOrder: false,
  orderModalVisible: false,
};

const ingredientsReducer = (
  // eslint-disable-next-line default-param-last
  state: TIngredientsState = initialState,
  action: TIngredientsActions,
): TIngredientsState => {
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
        ingredients: action.payload,
      };
    }
    case GET_INGREDIENTS__FAILURE: {
      return {
        ...state,
        ingredients: [],
        isLoading: true,
      };
    }
    case REORDER_INGREDIENTS: {
      // eslint-disable-next-line no-case-declarations
      const { oldIndex, newIndex } = action.payload;
      // eslint-disable-next-line no-case-declarations
      const updatedIngredients = Array.from(state.constructorIngredients);
      // eslint-disable-next-line no-case-declarations
      const [removed] = updatedIngredients.splice(oldIndex, 1);
      updatedIngredients.splice(newIndex, 0, removed);
      return {
        ...state,
        constructorIngredients: updatedIngredients,
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
        constructorIngredients:
          [...state.constructorIngredients, {
            ingredient: action.payload,
          }],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients
          .filter((el) => el.ingredient.uniqueId !== action.payload),
      };
    }
    case POST_ORDER__REQUEST: {
      return {
        ...state,
        isLoadingOrder: true,
      };
    }
    case POST_ORDER__SUCCESS: {
      return {
        ...state,
        isLoadingOrder: false,
        createdOrder: action.payload,
      };
    }
    case POST_ORDER__FAILURE: {
      return {
        ...state,
        isLoadingOrder: false,
        error: action.payload,
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
      };
    }
    case CURRENT_ITEM_CLOSE: {
      return {
        ...state,
        currentItem: null,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.payload,
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bunData: null,
        constructorIngredients: [],
        totalPrice: 0,
        createdOrder: null,
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-underscore-dangle
      const _exhaustiveCheck: never = action;
      return state;
    }
  }
};

export default ingredientsReducer;
