export const BASE_URL = 'https://norma.nomoreparties.space/api';
const apiIngredients = `${BASE_URL}/ingredients`;

export const checkResponse = (res) => (res.ok ? res.json() : res.json()
  .then((err) => Promise.reject(err)));

export const getIngredients = async () => {
  const res = await fetch(apiIngredients);
  return checkResponse(res);
};
