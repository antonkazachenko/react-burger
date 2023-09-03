const api = "https://norma.nomoreparties.space/api/ingredients";

const getIngredients = () => {
  return fetch(api)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export default getIngredients;