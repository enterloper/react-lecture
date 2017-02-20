import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import RequireAuth from './components/HOC/RequireAuth';
import App from './components/app';
import UserList from './components/UserList';
import reducers from './reducers';
import Async from './middlewares/async';


const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="resources" component={RequireAuth(UserList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
