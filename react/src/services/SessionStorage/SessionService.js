const SESSION_KEY = "react_session";

export function createSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function destroySession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSessionData() {
  return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || {};
}

export function isAuthenticated() {
  return !!getSessionData();
}