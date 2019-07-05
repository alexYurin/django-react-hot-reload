import { authConstants } from '../../config/constants/auth.constants';
import { IAuth } from '../../config/models/user.model';

type Action = {
  type: string;
  user: any;
  error: string;
};

const initialState: IAuth = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: ''
};

export function auth(state: IAuth = initialState, action: Action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        ...initialState,
        isLoading: false,
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.error
      };
    case authConstants.GET_AUTH_USER_REQUEST:
    case authConstants.GET_AUTH_USER_SUCCESS:
    case authConstants.GET_AUTH_USER_FAILURE:
    case authConstants.LOGOUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
