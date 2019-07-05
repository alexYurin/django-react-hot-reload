import { authConstants } from '../../config/constants/auth.constants';
import { api } from './auth.api';

export const login = (params: object) => async (dispatch: any) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });

  try {
    const response = await api.login(params);

    console.log(response)

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      user: response,
    });
    //await AsyncStorage.setItem('user', JSON.stringify(user));
    //return user;
  } catch (error) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      error: error.message,
    });
  }
};
