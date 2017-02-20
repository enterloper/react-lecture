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
  const request = axios.get('https://jsonplaceholder.typicode.com/users');
  request.then(x => {
    console.log(x);
  });
  return {
    type: FETCH_USERS,
    payload: request,
  }
}