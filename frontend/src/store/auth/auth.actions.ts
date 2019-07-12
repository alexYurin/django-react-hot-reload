import { authConstants } from '../../constants/auth.constants';
import { api } from './auth.api';

export const login = (params?: object) => async (dispatch: any) => {
  const token = localStorage.getItem('token');
  const api_auth = params ? api.login : api.get_current_user;
  const args = params ? params : token;

  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });
  
  await api_auth(args).then(({ data: { user: user } }) => {
    
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      user: {
        email: user.email,
        username: user.username
      },
    });
    
    params && localStorage.setItem('token', user.token);
    

  }).catch(error => {
    
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      error: error.message,
    });
    
  })
};

export const logout = () => (dispatch: any) => {
  dispatch({
    type: authConstants.LOGOUT,
  });
  localStorage.removeItem('token')
};
