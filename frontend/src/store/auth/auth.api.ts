import { http } from '../../api';
import { apiConstants } from '../../constants/api.constants';

export const api = {
  login: async (params: any) => {
    return await http.post(`${apiConstants.AUTH}${apiConstants.LOGIN}`, {
      user: params
    })
  },
  get_current_user: async (token: any) => {
    return await http.get(`${apiConstants.AUTH}${apiConstants.USER}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
  },
};