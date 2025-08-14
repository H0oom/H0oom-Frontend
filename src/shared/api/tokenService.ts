import cookie, { SerializeOptions } from 'cookie';
import axiosClient from './axiosClient';

const ACCESS_TOKEN_KEY = 'accessToken';

const COOKIE_OPTIONS: SerializeOptions = {
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
};

export function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = cookie.parse(document.cookie || '');
  return cookies[ACCESS_TOKEN_KEY] || null;
}

export function setAccessToken(token: string, maxAgeSec = 60 * 60) {
  if (typeof document === 'undefined') return;
  document.cookie = cookie.serialize(ACCESS_TOKEN_KEY, token, {
    ...COOKIE_OPTIONS,
    maxAge: maxAgeSec,
  });
}

export function clearTokens() {
  if (typeof document === 'undefined') return;
  document.cookie = cookie.serialize(ACCESS_TOKEN_KEY, '', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}
