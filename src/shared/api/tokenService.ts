import cookie, { SerializeOptions } from "cookie";
import axiosClient from "./axiosClient";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const COOKIE_OPTIONS: SerializeOptions = {
  path: "/",
  secure: true,
  sameSite: "strict" as const, 
};

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = cookie.parse(document.cookie || "");
  return cookies[ACCESS_TOKEN_KEY] || null;
}

export function getRefreshToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = cookie.parse(document.cookie || "");
  return cookies[REFRESH_TOKEN_KEY] || null;
}

export function setAccessToken(token: string, maxAgeSec = 60 * 60) {
  if (typeof document === "undefined") return;
  document.cookie = cookie.serialize(ACCESS_TOKEN_KEY, token, {
    ...COOKIE_OPTIONS,
    maxAge: maxAgeSec,
  });
}

export function setRefreshToken(token: string, maxAgeSec = 60 * 60 * 24 * 7) {
  if (typeof document === "undefined") return;
  document.cookie = cookie.serialize(REFRESH_TOKEN_KEY, token, {
    ...COOKIE_OPTIONS,
    maxAge: maxAgeSec,
  });
}

export function clearTokens() {
  if (typeof document === "undefined") return;
  document.cookie = cookie.serialize(ACCESS_TOKEN_KEY, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  document.cookie = cookie.serialize(REFRESH_TOKEN_KEY, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await axiosClient.post("/auth/refresh", { refreshToken });

    const newToken = res.data.accessToken;
    setAccessToken(newToken);
    return newToken;
  } catch (err) {
    return null;
  }
}