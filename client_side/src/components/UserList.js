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