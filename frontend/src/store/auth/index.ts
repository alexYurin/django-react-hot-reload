import { authConstants } from '../../constants/auth.constants';
import { IUser, IAuth } from '../../models/user.model';

type IAuthAction = {
  user: IUser;
  type: string;
  errors: any;
};

const initialState: IAuth = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  errors: ''
};

export function auth(state: IAuth = initialState, action: IAuthAction) {
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
        isAuthenticated: true,
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        ...action.errors
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};
