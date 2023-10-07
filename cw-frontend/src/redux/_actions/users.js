import { GET_USERS_REQUEST } from 'redux/_types'

export function getUsers(users) {
  return {
    type: GET_USERS_REQUEST,
    payload: users,
  }
}
