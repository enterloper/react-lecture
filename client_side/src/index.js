import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import Async from './middlewares/async';
import RequireAuth from './components/HOC/RequireAuth'
import App from './components/app';
import UserList from './components/User_List';
import Resources from './components/Resources';
import Memo from './components/memo';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="user-list" component={RequireAuth(UserList)}/>
        <Route path="resources" component={RequireAuth(Resources)} />
        <Route path="/memo" component={Memo} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
