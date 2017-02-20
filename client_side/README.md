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

###IN STYLE/STYLE.CSS
```
.user-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

}

.card {
    width: 30%;
    min-width: 18.75rem;
}
```

###IN ACTION/INDEX.JS
```$xslt
import axios from 'axios';

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
  //the axios request returns a promise, so we have to get the data we want from the request and place it inside of our action
  //Once that action flows into the reducers. To prevent a race condition where on the one hand we want immediate access to the data in request
  //but on the other hand we've got a request that takes some x amount of time.
  const request = axios.get('https://jsonplaceholder.typicode.com/users');
  console.log('Request:', request);
  request.then(x=>{
    console.log(x);
  })
  // return {
  //   type: FETCH_USERS,
  //   payload: [
  //     { name: 'Han' },
  //     { name: 'Yoda' },
  //     { name: 'Luke' },
  //   ]
  // }
  return {
    type: FETCH_USERS,
    payload: request,
  }
}
```
###IN USER LIST
```$xslt
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
        <p className="card-text">{user.company.name}</p>
        <a className="btn btn-primary" href={user.website}>Website: {user.website}</a>
      </div>
    );
  }

  render() {
    return (
      <div className="user-list">
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

###IN MIDDLESWARES/ASYNC.JS
```$xslt

export default function({ dispatch }) {
  return next => action => {
    // console.log(action); //STEP1
    //STEP2 if action does not have  apaylod, or the paylod is not thenable, we don't care send it on.
    if(!action.payload || !action.payload.then) {
      return next(action);
    }
    //STEP2
    // console.log('Promise here!', action);
    // next(action);

    // STEP3 make sure the action's promise resolves
    // take everything the action contains (spread operator, but extend over it the RESPONSE, removing the promise in place of response value.
    action.payload
      .then(function(response) {
        //create a new action with the old type,
        //but replace the promise with the response data
        const newAction = { ...action, payload: response};
        //to ensure the action goes through all the middlewares we could potentially have, we do not use the next function
        //but instead we use the dispatch method.
        //dispatch literally means take the action and pretend like its a brand new action, send it through the ENTIRE cycle all over again.
        // on the next loop through,
        // 2 questions:
        //  Q1: Won't there be an infinite loop that occurs if we go back through the cycle?
        //  Answer: No. the action won't be a promise, so it'll hit the early return.
        //  Q2: Why are we using dispatch here in the first place? Why not just use next?
        //  Answer: if this middleware we just wrote is the last in the middleware stack, but the middleware prior in the stack needs to modify that data
        //          the prior middleware has to be called. SO this is a key component of functional programming, ensuring that we put data in, and always get a consistent output.
        dispatch(newAction);
      })
  };
};
//dispatch is a function that is one property of an object we will pull off using destructuring.

//So we have this funky function signature syntax. From this file we're return a function, when ran it's going to return ANOTHER function.
// and when that function is ran, the function that is running will call ANOTHER function that can get called with an action.
//so in ES5 the above would look like:
// export default function ({ dispatch }) {
//   return function(next) {
//     return function(action) {
//       console.log(action)
//       next(action);
//     }
//   }
// }


/* So to review: Our middleware has always had the same signature at the top. We're always going to return a function that gets called with dispatch
 and we're going to return from that another function that gets called with next and we'll return from that another function that gets returned with action
 and inside that last function body is where we can place logic that can be run every single time an action creator returns an action inside of our application.
 Every single action we return from action creator is going to flow through this function.
 So as a caveat, if this was a very large application with a lot of action creators, I would see tons of logs to the console of every single action that got dispatched
 inside of our very large application.
 */
 ```
 
 ###IN REDUCERS/USERS
 ```
 import {
   FETCH_USERS
 } from '../actions/types';
 
 export default function(state = [], action) {
   switch (action.type) {
     case FETCH_USERS:
       //debugger; //used to show what's going on with axios race condition. The problem is we didn't give the promise time to resolve.
       //so we need middleware that forces us to wait for the promise to resolve.
       // console.log(action.payload); //DO after completing promise handling!
       // return [ ...state, ...action.payload ];
       return [ ...state, ...action.payload.data ];
   }
 
   return state;
 }
 ```
 
 ###IN ROOT-INDEX.JS
 ```$xslt
import Async from './middlewares/async';


const createStoreWithMiddleware = applyMiddleware(Async)(createStore);
```

###IN ROOT-INDEX.JS (working with reduxform now)
```$xslt
        import Memo from './components/memo';
        <Route path="/memo" component={Memo} />
```

###IN Memo.JS
```
import React, { Component, PropTypes } from 'react';
import { reduxForm, Fields } from 'redux-form';
import { Link } from 'react-router';
import { everySingle, transform } from '../utils/methods';
//import _ from 'lodash';
const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Memo',
    id: 0,
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this memo',
    id: 1,
  },
  content: {
    type: 'textarea',
    label: 'Memo Contents',
    id: 2,
  }
};

class Memo extends Component {
  onSubmit(props) {
    console.log(props);
    alert('Post Submitted');
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]; //off of Redux Form

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.id}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    )
  }

  render() {
    // const { handleSubmit, fields: { title, categories, content }} = this.props;
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
        <h3>Create A New Memo</h3>
        {transform(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}
function validate(values) {
  const errors = {};
  // if(!values.title) {
  //   errors.title = 'Enter title';
  // }
  // if(!values.categories) {
  //   errors.categories = 'Enter categories';
  // }
  // if(!values.content) {
  //   errors.content = 'Enter content';
  // }
  everySingle(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `Enter a ${field}`
    }
  })
  return errors;
}

export default reduxForm({
  form: 'Memo',
  fields: /*['title', 'categories', 'content']*/ Object.keys(FIELDS),
  validate
})(Memo)

/*
//DIV TO ORIGINALLY INSERT
<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`} >
<label>Title</label>
<input type="text" className="form-control" {...title} />
<div className="text-help">
{title.touched ? title.error : ''}
</div>
</div>
<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`} >
  <label>Categories</label>
  <input type="text" className="form-control" {...categories} />
  <div className="text-help">
    {categories.touched ? categories.error : ''}
  </div>
</div>
<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`} >
  <label>Title</label>
  <input type="text" className="form-control" {...content} />
  <div className="text-help">
    {content.touched ? content.error : ''}
  </div>
 </div>
*/
```

###IN HEADER
```$xslt
         <li className="nav-item">
            <Link to="/memo">Memos</Link>
          </li>
```

###IN REDUCERS/INDEX
```$xslt
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import authReducer from './authentication';
import usersReducer from './users';
const rootReducer = combineReducers({
  authenticated: authReducer,
  users: usersReducer,
  form: form,
});

export default rootReducer;

```

###IN UTILS/METHODS
```
   const everySingle = (collection, callback) => {
     if(typeof collection !== 'object') {
       console.log('invalid entry');
     }
     if(Array.isArray(collection)) {
       for(let i=0, l=collection.length; i<l; i++){
         callback(collection[i], i, collection);
       }
     } else {
       for(let key in collection) {
         callback(collection[key], key, collection)
       }
     }
   };
   
   const transform = (collection, callback) => {
     let output = [];
     everySingle(collection, (x, i, collection) => {
       output.push(callback(x, i, collection));
     });
     return output;
   };
   
   
   export {
     everySingle,
     transform,
   };
```