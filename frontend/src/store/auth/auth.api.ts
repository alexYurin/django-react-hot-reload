import { http } from '../../config/api';
import { apiConstants } from '../../constants/api.constants';

http.defaults.xsrfCookieName = 'csrftoken';
http.defaults.xsrfHeaderName = 'X-CSRFToken';

export const api = {
  login: async (params: object) => {
    return await http.post(apiConstants.AUTH_TOKEN, {
      body: JSON.stringify(params)
    })
  },
};