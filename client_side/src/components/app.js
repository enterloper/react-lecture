import React, { Component } from 'react';
import Header from './Header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <h5>React Higher Order Components and other neat things too.</h5>
        {this.props.children}
      </div>
    );
  }
}
