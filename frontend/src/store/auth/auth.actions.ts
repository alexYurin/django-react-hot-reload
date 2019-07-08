import { authConstants } from '../../constants/auth.constants';
import { api } from './auth.api';

export const login = (params: object) => async (dispatch: any) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });

  try {
    const response = await api.login(params).then(response => (
      response
    ))

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      user: response,
    });
  } catch (error) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      error: error.message,
    });
  }
};
