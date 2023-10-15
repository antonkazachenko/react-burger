import checkResponse from '../../utils/apiUtils';
import BASE_URL from '../../utils/constants';

export const GET_INGREDIENTS__REQUEST = 'GET_INGREDIENTS__REQUEST';
export const GET_INGREDIENTS__SUCCESS = 'GET_INGREDIENTS__SUCCESS';
export const GET_INGREDIENTS__FAILURE = 'GET_INGREDIENTS__FAILURE';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const CHANGE_BUN = 'CHANGE_BUN';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';
export const POST_ORDER__REQUEST = 'POST_ORDER__REQUEST';
export const POST_ORDER__SUCCESS = 'POST_ORDER__SUCCESS';
export const POST_ORDER__FAILURE = 'POST_ORDER__FAILURE';

export const CURRENT_ITEM_OPEN = 'CURRENT_ITEM_OPEN';
export const CURRENT_ITEM_CLOSE = 'CURRENT_ITEM_CLOSE';

export const SET_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const RESET_TOTAL_PRICE = 'DECREASE_TOTAL_PRICE';

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS__REQUEST });
    return fetch(`${BASE_URL}/ingredients`)
      .then((res) => checkResponse(res))
      .then((data) => {
        dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS__FAILURE, payload: err });
      });
  };
}

export function createOrderRequest(constructorIngredients) {
  return function (dispatch) {
    // Start the API call by dispatching a request action
    dispatch({ type: POST_ORDER__REQUEST });

    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ingredients: constructorIngredients,
      }),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        dispatch({ type: POST_ORDER__SUCCESS, payload: res });
        return res;
      })
      .catch((err) => {
        dispatch({ type: POST_ORDER__FAILURE, payload: err });
        console.log(err);
      });
  };
}
