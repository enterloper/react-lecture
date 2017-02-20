import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    render(){
      console.log(this.context)
      return <ComposedComponent {...props} />
    }
  }
  return connect(mapStateToProps)(Authentication);
}