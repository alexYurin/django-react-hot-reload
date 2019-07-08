import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import configureStore, { history } from './store';
import '../styles';

const initialState = {};
const store = configureStore(initialState);
const rootHTMLElement = document.getElementById('root');

const render = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    (
      <AppContainer>
        <Component
          history={history}
          store={store}
        />
      </AppContainer>
    ),
    rootHTMLElement
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => { render(Root); });
}
