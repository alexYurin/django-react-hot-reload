import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import routes from '../routes';

interface IRoot {
  store: any;
  history: any;
};

const Root = (props: IRoot) => {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  );
};

export default Root
