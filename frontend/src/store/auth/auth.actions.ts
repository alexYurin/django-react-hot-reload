import { authConstants } from '../../constants/auth.constants';
import { api } from './auth.api';

export const login = (params?: object) => async (dispatch: any) => {
  const token = localStorage.getItem('token');
  const api_auth = params ? api.login : api.get_current_user;
  const args = params ? params : token;

  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });
  

  try {
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

      const { data: errors } = error.response
      
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        errors,
      });
      
    })
  } catch(error) {
    console.log('try', error.message)
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      errors: error.message,
    });
  }
};

export const logout = () => (dispatch: any) => {
  dispatch({
    type: authConstants.LOGOUT,
  });
  localStorage.removeItem('token')
};
