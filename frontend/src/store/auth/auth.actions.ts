import { authConstants } from '../../constants/auth.constants';
import { api } from './auth.api';

export const login = (params: object) => async (dispatch: any) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });
  
  await api.login(params).then(({ data: { user: user } }) => {
    
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      user: {
        email: user.email,
        username: user.username
      },
    });
    localStorage.setItem('token', user.token);    

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

export const checkUser = () => async (dispatch: any) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });

  const token = localStorage.getItem('token');

  await api.token(token).then(res => {
    console.log(res)
  }).catch(error => {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      error: error.message,
    });
  })
};
