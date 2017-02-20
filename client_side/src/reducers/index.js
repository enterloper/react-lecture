import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authentication';
import usersReducer from './users';

const rootReducer = combineReducers({
  authenticated: authReducer,
  users: usersReducer,
  form,
});

export default rootReducer;
