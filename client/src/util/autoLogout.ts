import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { msTo4am } from './dates';

let logoutTimeout;

export const setNightLogout = () => {
  clearTimeout(logoutTimeout);

  const logout = () => {
    sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    window['adminBracelet'] = null;
    window.location.reload();
  };

  logoutTimeout = setTimeout(() => {
    if (!sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      return;
    }
    if (window.confirm('You will be logged out in 3 minutes. Logout now?')) {
      logout();
    } else {
      setTimeout(logout, 3 * 60 * 1000);
    }
  }, msTo4am);
};
