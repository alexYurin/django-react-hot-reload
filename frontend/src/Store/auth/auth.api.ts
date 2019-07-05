import { http } from '../../config/api';

export const api = {
  login: async (params: object) => {
    return await http.post('token-auth', {
      body: JSON.stringify(params)
    })
  },
};