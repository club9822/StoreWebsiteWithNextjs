import cookie from 'js-cookie';
import { isServerSide } from '@/utils/helpers';
import { serialize, parse } from 'cookie'


export const TOKEN_NAME = 'token'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

export const setCookie = (key:string, value:string) => {
  if (!isServerSide) {
    cookie.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
};

export const removeCookie = (key:string) => {
  if (!isServerSide) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

function getCookieFromBrowser(key:string) {
  return cookie.get(key);
}

function getCookieFromServer(key:string, req:any) {
  if (!req?.headers?.cookie) {
    return undefined;
  }
  const rawCookie = req?.headers?.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
}

export function getCookie(key:string, req:any) {
  return (!isServerSide
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req));
}
