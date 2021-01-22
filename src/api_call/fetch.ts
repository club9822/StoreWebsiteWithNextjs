import { API } from '@/constants/api';
import { getCookie } from '@/utils/cookie';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
/**
 *
 * adding some codes to basic fetch api
 *
 *
 *
 * @param url
 * @param method
 * @param body
 * @param params
 * @param set_cookie
 * @param */
export function extendedFetch(url: string, method: string = 'get', body: any|null = {}, params: any|null = null, setCookie: boolean = true) {
  return new Promise((resolve, reject) => {
    /**
     * full url path
     */
    const targetUrl = new URL(url, API);

    /**
     * append params to url if exist
     */
    if (params) {
      for (const property in params) {
        targetUrl.searchParams.append(property, (params[property]).toString());
      }
    }
    /**
     * append coockie to header
     */
    if (setCookie) {
      headers.Authorization = `Bearer ${getCookie('bearer_token', null)}`;
    }
    fetch(targetUrl.href, { method, body, headers }).then((res) => res.json()).then((result) => resolve(result)).catch((e) => reject(e));
  });
}
