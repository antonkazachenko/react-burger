import {
  GET_INGREDIENTS__SUCCESS,
  GET_INGREDIENTS__FAILURE,
  GET_INGREDIENTS__REQUEST,
  POST_ORDER__REQUEST,
  POST_ORDER__SUCCESS,
  POST_ORDER__FAILURE,
} from '../services/actions/ingredients';

export const BASE_URL = 'https://norma.nomoreparties.space/api';
const apiIngredients = `${BASE_URL}/ingredients`;

export const checkResponse = (res) => (res.ok ? res.json() : res.json()
  .then((err) => Promise.reject(err)));

// export const getIngredients = async () => {
//   const res = await fetch(apiIngredients);
//   return checkResponse(res);
// };

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS__REQUEST });
    return fetch(apiIngredients)
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
