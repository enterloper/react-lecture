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