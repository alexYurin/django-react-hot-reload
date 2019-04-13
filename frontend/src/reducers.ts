import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer } from "drf-redux-auth";

const rootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
});

export default rootReducer
