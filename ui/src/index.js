import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import App from './app.js'
import createStore from './store.js'

import './index.module.scss'
import './fonts/fonts.module.scss'

import 'react-dates/lib/css/_datepicker.css';

const history = createHistory();
const store = createStore(history);

render(<Provider store={store}>
    <App router={<ConnectedRouter history={history} />} />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}