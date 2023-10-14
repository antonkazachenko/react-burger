import { GET_INGREDIENTS__SUCCESS, GET_INGREDIENTS__FAILURE, GET_INGREDIENTS__REQUEST } from '../services/actions/ingredients';

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
      .then((data) => dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: data }))
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS__FAILURE, payload: err });
      });
  };
}
