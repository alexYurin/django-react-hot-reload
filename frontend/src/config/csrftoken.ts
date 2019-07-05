import { getCookie } from './cookie';

export function getToken() {
  return getCookie('csrftoken')
};
