import BASE_URL from './constants';
import { setCookie } from './cookie';
import store, { AppDispatch } from '../services/store';

type Dispatch = typeof store.dispatch;

type TRequestOptions = {
  method: string,
  headers: {
    'Content-Type': string,
    Authorization?: string,
    authorization?: string,
  },
  body?: string,
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

// TODO: remove this any
interface ApiResponse {
  success: boolean;
  [key: string]: any;
}

const checkResponse = (res: Response) => (res.ok ? res.json() : res.json()
  .then((err: Error) => Promise.reject(err)));

const checkSuccess = (res: ApiResponse) => {
  if (res && res.success) {
    return res;
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint: string, options?: TRequestOptions) => fetch(`${BASE_URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);

// TODO: test this
export const fetchWithRefresh = async (
  url: string,
  options: TRequestOptions,
  refreshToken: () => (dispatch: AppDispatch) => void,
  dispatch: Dispatch,
) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (getErrorMessage(err) === 'jwt expired') {
      dispatch(refreshToken());
      const refreshData = await request('/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      });
      if (!refreshData.success) {
        await Promise.reject(refreshData);
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
