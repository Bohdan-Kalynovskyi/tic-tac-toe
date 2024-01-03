import axios, { AxiosError, ResponseType } from 'axios';
import { stringify } from 'qs';
import { toast } from 'react-toastify';
import { API_BASE } from '../config/config';
import { OFFLINE_ERROR_CODE } from '../constants/http';
import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';

export type IStringNumberMap = { [key: string]: string | number };
export type IStringMap = { [key: string]: string };
export type INumberMap = { [key: string]: number };

const getParamsString = (params: IStringNumberMap) => {
  const encodedParams = stringify(params, { encodeValuesOnly: true, skipNulls: true });
  return encodedParams ? `?${encodedParams}` : '';
};

type IHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
const HttpMethods: IHttpMethod[] = ['get', 'post', 'put', 'patch', 'delete'];

export interface IAxiosConfig {
  method: IHttpMethod;
  url: string;
  headers: IStringMap;
  responseType?: ResponseType;
  data?: object | string;
}

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

interface IRequestOptions {
  isAuth?: boolean;
  contentType?: string;
  responseType?: ResponseType;
}

const defaultReqOpts: IRequestOptions = { isAuth: true };

const isOffline = err => !err.response;
const is400 = err => err.response?.status === 400 || err.response?.status === 406;
const is401 = err => err.response?.status === 401;
const is403 = err => err.response?.status === 403;
const is429 = err => err.response?.status === 429;
const is50X = err => err.response?.status >= 500;

const handleNetworkError = (err: AxiosError) => {
  if (isOffline(err)) {
    // NOTE: CORS issues are also detected as network error and there is no way to distinguish between them
    toast.error('Offline');
    throw {
      status: OFFLINE_ERROR_CODE,
      data: err.message,
    };
  } else if (is401(err)) {
    sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    const message = err?.config?.url?.includes('login')
      ? 'Wrong username or password'
      : 'Your login expired, please re-login';
    toast.error(message);
  } else if (is400(err)) {
    toast.error('Error 400');
  } else if (is403(err)) {
    toast.error(403);
  } else if (is429(err)) {
    toast.error(429);
  } else if (is50X(err)) {
    console.error(err);
    toast.error('! Server Error 500 !');
  }
  throw err.response;
};

const getHeaders = (requestOptions?: IRequestOptions): IStringMap => {
  const reqOpts = { ...defaultReqOpts, ...requestOptions };
  const headers = { ...defaultHeaders };
  if (reqOpts.contentType) {
    headers['Content-Type'] = reqOpts.contentType;
  }
  return headers;
};

const getUrl = (resource: string, params?: IStringNumberMap | string): string => {
  let paramsString = params || '';
  if (typeof params === 'object') {
    paramsString = getParamsString(params);
  }
  return API_BASE + resource + paramsString;
};

const apiRequestPromise = (config: IAxiosConfig) =>
  axios(config)
    .then(({ data }) => data)
    .catch(handleNetworkError);

const getRequestConfig = (
  method: IHttpMethod,
  resource: string,
  data?: object,
  requestOptions?: IRequestOptions,
  urlParams?
): IAxiosConfig => ({
  method,
  url: getUrl(resource, urlParams),
  headers: getHeaders(requestOptions),
  responseType: requestOptions?.responseType,
  data,
});

const createRequestPromise =
  (method: IHttpMethod) =>
  (resource: string, data?: object, requestOptions?: IRequestOptions, urlParams?) =>
    apiRequestPromise(getRequestConfig(method, resource, data, requestOptions, urlParams));

export interface IRequests {
  [key: string]: (
    resource: string,
    data?: object,
    requestOptions?: IRequestOptions,
    urlParams?: IStringNumberMap | string
  ) => Promise<any>;
}

export const http: IRequests = HttpMethods.reduce(
  (result, method) => ({
    ...result,
    [method]: createRequestPromise(method),
  }),
  Object.create(null)
);
