import { parseCookies, setCookie, destroyCookie } from 'nookies';

const ACCESS_TOKEN_KEY = 'accessToken';

export function getAccessToken(): string | null {
  try {
    const cookies = parseCookies();
    return cookies[ACCESS_TOKEN_KEY] || null;
  } catch (error) {
    console.error('Error parsing cookies:', error);
    return null;
  }
}

export function setAccessToken(token: string, maxAgeSec = 60 * 60) {
  try {
    setCookie(null, ACCESS_TOKEN_KEY, token, {
      maxAge: maxAgeSec,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  } catch (error) {
    console.error('Error setting access token:', error);
  }
}

export function clearTokens() {
  try {
    destroyCookie(null, ACCESS_TOKEN_KEY, {
      path: '/',
    });
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
}
