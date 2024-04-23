const SESSION_KEY = "react_session";

export function createLocalStorageSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionData() {
  return JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
}

export function isAuthenticated() {
  return !!getSessionData();
}
