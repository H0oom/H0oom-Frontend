const ACCESS_TOKEN_KEY = 'accessToken';

function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString) return cookies;

  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: string;
  } = {},
) {
  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }
  if (options.path) {
    cookieString += `; Path=${options.path}`;
  }
  if (options.secure) {
    cookieString += '; Secure';
  }
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

export function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;

  try {
    const cookies = parseCookies(document.cookie);
    return cookies[ACCESS_TOKEN_KEY] || null;
  } catch (error) {
    console.error('Error parsing cookies:', error);
    return null;
  }
}

export function setAccessToken(token: string, maxAgeSec = 60 * 60) {
  if (typeof document === 'undefined') return;

  try {
    setCookie(ACCESS_TOKEN_KEY, token, {
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
  if (typeof document === 'undefined') return;

  try {
    setCookie(ACCESS_TOKEN_KEY, '', {
      maxAge: 0,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
}
