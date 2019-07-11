import { http } from '../../api';
import { apiConstants } from '../../constants/api.constants';

export const api = {
  login: async (params: object) => {
    return await http.post(`${apiConstants.AUTH}${apiConstants.LOGIN}`, {
      user: params
    })
  },
  token: async (token: string) => {
    return await http.post(`${apiConstants.AUTH}${apiConstants.USER}`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
};