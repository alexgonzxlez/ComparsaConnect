import Cookies from 'js-cookie';

const SESSION_KEY = "react_session";

export function createSession(token, expires) {
  if (!expires) {
    const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000); // 1h
    Cookies.set(SESSION_KEY, token, { expires: expirationTime });
  } else {
    Cookies.set(SESSION_KEY, token, { expires });
  }
}

export function destroySession() {
  Cookies.remove(SESSION_KEY);
}

export function getSessionData() {
  return Cookies.get(SESSION_KEY) || null;
}

export function isAuthenticated() {
  return !!getSessionData();
}
