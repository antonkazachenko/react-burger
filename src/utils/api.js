const PATH = "https://norma.nomoreparties.space/api";
const apiIngredients = `${PATH}/ingredients`;

const getIngredients = async () => {
  const res = await fetch(apiIngredients);
  return checkResponse(res);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default getIngredients;