import BASE_URL from './constants';
import { setCookie } from './cookie';
import store from '../services/store';

type Dispatch = typeof store.dispatch;

type TRequestOptions = {
  method: string,
  headers: {
    'Content-Type': string,
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

const request = (endpoint: string, options: TRequestOptions) => fetch(`${BASE_URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);

export const fetchWithRefresh = async (
  url: string,
  options: TRequestOptions,
  refreshToken: string,
  dispatch: Dispatch,
) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (getErrorMessage(err) === 'jwt expired') {
      // TODO: remove this any
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const refreshData = await dispatch(refreshToken());
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
