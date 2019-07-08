import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';

import rootReducer from '../reducers';

const development = process.env.NODE_ENV !== 'production';

export const history = createBrowserHistory();

// Function to call to configure Redux store
const configureStore = (initialState: any) => {
  const enhancer = compose(
    // Middleware you want to use in development
    development ?
    applyMiddleware(thunk, createLogger()) :
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    // Required! Enable Redux DevTools with the monitors you chose
  );

  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument
  // See: https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(
    rootReducer(history),
    initialState,
    enhancer
  );

  // Hot Reload reducers
  // Note: Requires Webpack or Browserify HMR to be enabled
  if (development && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
  return store;
};

export default configureStore
