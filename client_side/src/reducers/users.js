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