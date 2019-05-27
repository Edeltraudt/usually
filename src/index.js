import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './asset/scss/styles.scss';

import * as serviceWorker from './serviceWorker';

import { StartWithRouter } from './pages/start/Start';
import { Dashboard } from './pages/dashboard';

import { Store } from './Store';

const store = new Store();
const start = () => <StartWithRouter store={store} />;
const dashboard = () => <Dashboard store={store} />;

const routing = (
  <Router>
    <Route path="/" exact component={start} />
    <Route path="/dashboard" component={dashboard} />
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
