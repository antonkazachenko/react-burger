import * as types from '../constants/ingredients';
import ingredientsReducer from './ingredients';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
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
    });
  });
  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.GET_INGREDIENTS__REQUEST,
        },
      ),
    ).toEqual({
      isLoading: true,
    });
  });
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.GET_INGREDIENTS__SUCCESS,
          payload: [{ _id: '123' }],
        },
      ),
    ).toEqual({
      ingredients: [{ _id: '123' }],
      isLoading: false,
    });
  });
  it('should handle GET_INGREDIENTS_ERROR', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.GET_INGREDIENTS__FAILURE,
        },
      ),
    ).toEqual({
      ingredients: [],
      isLoading: true,
    });
  });
  it('should handle ADD_INGREDIENT', () => {
    expect(
      ingredientsReducer(
        {
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
        },
        {
          type: types.ADD_INGREDIENT,
          payload: { _id: '123' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [{
        ingredient: { _id: '123' },
      }],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [{
            ingredient: { _id: '123' },
          }],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.ADD_INGREDIENT,
          payload: { _id: '123' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [{
        ingredient: { _id: '123' },
      },
      {
        ingredient: { _id: '123' },
      }],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [{
            ingredient: { _id: '123' },
          }],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.ADD_INGREDIENT,
          payload: { _id: '456' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [{
        ingredient: { _id: '123' },
      },
      {
        ingredient: { _id: '456' },
      }],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
  });
  it('should handle CHANGE_BUN', () => {
    expect(
      ingredientsReducer(
        {
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
        },
        {
          type: types.CHANGE_BUN,
          payload: { _id: '123' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: { _id: '123' },
      isLoading: true,
      error: null,
      constructorIngredients: [],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: { _id: '123' },
          isLoading: true,
          error: null,
          constructorIngredients: [],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.CHANGE_BUN,
          payload: { _id: '456' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: { _id: '456' },
      isLoading: true,
      error: null,
      constructorIngredients: [],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
  });
  it('should handle REMOVE_INGREDIENT', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [{
            ingredient: { uniqueId: '123' },
          },
          {
            ingredient: { uniqueId: '456' },
          }],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.REMOVE_INGREDIENT,
          payload: '123',
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [{
        ingredient: { uniqueId: '456' },
      }],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [{
            ingredient: { uniqueId: '123' },
          },
          {
            ingredient: { uniqueId: '456' },
          }],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.REMOVE_INGREDIENT,
          payload: '456',
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [{
        ingredient: { uniqueId: '123' },
      }],
      createdOrder: null,
      currentItem: null,
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
  });
  it('should handle RESET_CONSTRUCTOR', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [{
            ingredient: { uniqueId: '123' },
          },
          {
            ingredient: { uniqueId: '456' },
          }],
          createdOrder: null,
          currentItem: null,
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.RESET_CONSTRUCTOR,
        },
      ),
    ).toEqual({
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
    });
  });
  it('should handle SET_TOTAL_PRICE', () => {
    expect(
      ingredientsReducer(
        {
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
        },
        {
          type: types.SET_TOTAL_PRICE,
          payload: 123,
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [],
      createdOrder: null,
      currentItem: null,
      totalPrice: 123,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
  });
  it('should handle CURRENT_ITEM_CLOSE', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          bunData: null,
          isLoading: true,
          error: null,
          constructorIngredients: [],
          createdOrder: null,
          currentItem: { uniqueId: '123' },
          totalPrice: 0,
          isLoadingOrder: false,
          orderModalVisible: false,
        },
        {
          type: types.CURRENT_ITEM_CLOSE,
        },
      ),
    ).toEqual({
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
    });
  });
  it('should handle CURRENT_ITEM_OPEN', () => {
    expect(
      ingredientsReducer(
        {
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
        },
        {
          type: types.CURRENT_ITEM_OPEN,
          payload: { uniqueId: '123' },
        },
      ),
    ).toEqual({
      ingredients: [],
      bunData: null,
      isLoading: true,
      error: null,
      constructorIngredients: [],
      createdOrder: null,
      currentItem: { uniqueId: '123' },
      totalPrice: 0,
      isLoadingOrder: false,
      orderModalVisible: false,
    });
  });
  it('should handle POST_ORDER__REQUEST', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.POST_ORDER__REQUEST,
        },
      ),
    ).toEqual({
      isLoadingOrder: true,
    });
  });
  it('should handle POST_ORDER__SUCCESS', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.POST_ORDER__SUCCESS,
          payload: { order: '123' },
        },
      ),
    ).toEqual({
      isLoadingOrder: false,
      createdOrder: { order: '123' },
    });
  });
  it('should handle POST_ORDER__FAILURE', () => {
    expect(
      ingredientsReducer(
        {},
        {
          type: types.POST_ORDER__FAILURE,
        },
      ),
    ).toEqual({
      isLoadingOrder: false,
    });
  });
  it('should handle REORDER_INGREDIENTS', () => {
    expect(
      ingredientsReducer(
        {
          constructorIngredients: [{ _id: '123' }, { _id: '456' }, { _id: '789' }],
        },
        {
          type: types.REORDER_INGREDIENTS,
          payload: {
            oldIndex: 0,
            newIndex: 2,
          },
        },
      ),
    ).toEqual({
      constructorIngredients: [{ _id: '456' }, { _id: '789' }, { _id: '123' }],
    });

    expect(
      ingredientsReducer(
        {
          constructorIngredients: [{ _id: '123' }, { _id: '456' }, { _id: '789' }],
        },
        {
          type: types.REORDER_INGREDIENTS,
          payload: {
            oldIndex: 2,
            newIndex: 0,
          },
        },
      ),
    ).toEqual({
      constructorIngredients: [{ _id: '789' }, { _id: '123' }, { _id: '456' }],
    });

    expect(
      ingredientsReducer(
        {
          constructorIngredients: [{ _id: '123' }, { _id: '456' }, { _id: '789' }],
        },
        {
          type: types.REORDER_INGREDIENTS,
          payload: {
            oldIndex: 0,
            newIndex: 1,
          },
        },
      ),
    ).toEqual({
      constructorIngredients: [{ _id: '456' }, { _id: '123' }, { _id: '789' }],
    });

    expect(
      ingredientsReducer(
        {
          constructorIngredients: [{ _id: '123' }, { _id: '456' }, { _id: '789' }],
        },
        {
          type: types.REORDER_INGREDIENTS,
          payload: {
            oldIndex: 1,
            newIndex: 0,
          },
        },
      ),
    ).toEqual({
      constructorIngredients: [{ _id: '456' }, { _id: '123' }, { _id: '789' }],
    });
  });
});
