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