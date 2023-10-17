import BASE_URL from './constants';

const checkResponse = (res) => (res.ok ? res.json() : res.json()
  .then((err) => Promise.reject(err)));

const request = (url, options) => fetch(`${BASE_URL}${url}`, options).then(checkResponse);
export default request;
