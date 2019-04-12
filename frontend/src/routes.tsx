import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hello from './components/Hello';

const routes = (
  <Switch>
    <Route exact={true} path='/' component={Hello} />
  </Switch>
);

export default routes
