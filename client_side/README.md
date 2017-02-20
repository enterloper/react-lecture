#React-Redux 

###Getting Started

Checkout this repo, install dependencies, then start the gulp process with the following:

```
	> npm install
	> npm start
```
###In InputStyled
```
import React, { PropTypes, Component } from 'react';
const { string, func } = PropTypes;

const propTypes= {
 name: string.isRequired,
 label: string.isRequired,
 onChange: func.isRequired,
 placeholder: string,
 value: string,
 error: string,
};

class InputStyled extends Component {
 constructor(props) {
   super(props);
 }

 render(){
   let wrapperClass = 'form-group';
   if(this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
   }
   return (
     <div className={wrapperClass}>
       <label htmlFor={this.props.name}>{this.props.label}</label>
       <div className="field">
         <input type="text"
                name={this.props.name}
                className="form-control"
                placeholder={this.props.placeholder}
                ref={this.props.name}
                onChange={this.props.onChange}
                value={this.props.value}
         />
         <div className="input">{this.props.error}</div>
       </div>
     </div>
   );
 }
}

InputStyled.propTypes = propTypes;
export default InputStyled;
```
### IN HEADER.JS
```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  authButton() {
    return <button>Sign In</button>
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-item">
            {this.authButton()}
          </li>
        </ul>
      </nav>
    );
  }
};

export default Header;

```
###IN APP.JS
```
import React, { Component } from 'react';
import InputStyled from './InputStyled';
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <h6>React Higher Order Components and other neat things too.</h6>
        {this.props.children}
      </div>
    );
  }
}
```
###IN RESOURCES.JS
```
import React, { Component } from 'react';

export default () => {
  return (
    <div>
      Sweet but spicy sauce
      <ul>
        <li>1oz Sugar</li>
        <li>1oz Pepper</li>
        <li>1oz Salt</li>
      </ul>
    </div>
  )
}

```
###IN REQUIREAUTH.JS
```$xslt
import React, { Component } from 'react';
import { connect } from 'react-redux';
//we export a function we'll get back another component with the "CLASS" of Authenitciatoin
export default function(ComposedComponent) {
  class Authentication extends Component {
    //this static keyword is defining a property or object on the class, NOT an instance, but the actual class.
    static contextTypes = {
      router: React.PropTypes.object
    }

    //THIRD STEP vvvv
    componentWillMount() {
      //this will be a THIRD proof of concept for using the router via this.context
      // this.context.router.push('/');
      if(!this.props.authenticated) {
        this.context.router.push('/');
      }
    }
    //cWillUpdate is called whenever a component is handed a new set of props, or be rendered nad the first argument to this is nextProps
    //once the user is on the resources page componentwillMount will have already ran, and so we need to make sure that we call it again whenever the component is about to be updated.
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
    console.log(this.context);
      // This will be a FIRST proof of concept that shows us it's working.
      //console.log('Rendering', ComposedComponent);
      //spread operator to ensure all props are properly passed.

      //this will be a SECOND proof of concept that shows we are getting the authenticated prop
      // console.log(this.props.authenticated);

      return <ComposedComponent {...this.props}/>
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}

//the difference between wrapping inside of a component, and wrapping on say router on the index.js file,
// is whether or not you expect every instance of the component in question being used in your application to require your higher order component.
// so consideration should be used when using higher order components.

/*steps:
    1: Question: how do tell if a user is logged in or not?
       Answer: connect our Authentication class to our Redux store,
       if they're Authenticated then great we can have them see the protect resources.
    2:
*/

/*Because context is so easy to abuse (my MOST top level component is going to provide all of my data for the entire application via context),
  react makes you define a property called 'contextTypes' on each component.
 */
```

###IN HEADER.JS
```
import { connect } from 'react-redux';
import * as actions from '../actions';

  authButton() {
    if(this.props.authenticated) {
      return <button onClick={() => this.props.authenticate(false)}>Sign Out</button>
    }
    return <button onClick={() => this.props.authenticate(true)}>Sign In</button>;
  }
  
  {{RENDER STUFFFFFFFF}}
  
  function mapStateToProps(state){
    return {authenticated: state.authenticated };
  }
  export default connect(mapStateToProps, actions)(Header);
  
```

###In REDUCERS/AUTHENTICATION
```
import {
  CHANGE_AUTH
} from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
  }
  return state;
}
```

###IN REDUCERS/INDEX
```
import { combineReducers } from 'redux';
import authReducer from './authentication';

const rootReducer = combineReducers({
  authenticated: authReducer
});

export default rootReducer;

```

###IN ACTIONS/INDEX
```
import {
  CHANGE_AUTH
} from "./types";

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}
```
###IN ACTIONS/TYPES
```
export const CHANGE_AUTH = 'CHANGE_AUTH';
```

###IN ROOT INDEX.JS
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import requireAuth from './components/require_authentication';
import App from './components/app';
import Resources from './components/resources';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="resources" component={requireAuth(Resources)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

```
###IN USER_LIST.JS
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
//do after explanations
import * as actions from '../actions';
//MUST HAVE COMPONENT WILL MOUNT TO SEED THE DATA, SHOW WITHOUT CWM first, then explain why.

class UserList extends Component {
  //do after explanations
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser(user) {
    return (
      <div className="card card-block">
        <h4 className="card-title">{user.name}</h4>
        <p className="card-text">KSquare Solutions</p>
        <a className="btn btn-primary">Email</a>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.users.map(this.renderUser)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}
//add actions only after explaining above.
export default connect(mapStateToProps, actions)(UserList);
```
###IN ACTIONS/TYPES
```$xslt
export const CHANGE_AUTH = 'CHANGE_AUTH';
export const FETCH_USERS = "FETCH_USERS";
```

###IN ACTION/INDEX
```$xslt
import {
  CHANGE_AUTH,
  FETCH_USERS,
} from "./types";

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS,
    payload: [
      { name: 'Han' },
      { name: 'Yoda' },
      { name: 'Luke' },
    ]
  }
}
```

###IN REDUCERS/USERS
```$xslt
import {
  FETCH_USERS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [ ...state, ...action.payload ];
  }

  return state;
}
```

###IN REDUCERS/INDEX
```
import { combineReducers } from 'redux';
import authReducer from './authentication';
import usersReducer from './users';
const rootReducer = combineReducers({
  authenticated: authReducer,
  users: usersReducer,
});

export default rootReducer;

```