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