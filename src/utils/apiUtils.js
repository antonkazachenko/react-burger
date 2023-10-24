import BASE_URL from './constants';
import { setCookie } from './cookie';

const checkResponse = (res) => (res.ok ? res.json() : res.json()
  .then((err) => Promise.reject(err)));

const request = (url, options) => fetch(`${BASE_URL}${url}`, options).then(checkResponse);

export const fetchWithRefresh = async (url, options, refreshToken, dispatch) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await dispatch(refreshToken());
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      // eslint-disable-next-line no-param-reassign
      options.headers.authorization = refreshData.accessToken;
      return request(url, options);
    }
    return Promise.reject(err);
  }
};

export default request;
