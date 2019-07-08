import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './store/auth';

const rootReducer = (history: any) => combineReducers({
  auth,
  router: connectRouter(history),
});

export default rootReducer
