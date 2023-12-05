import { GET_USERS_REQUEST } from 'redux/_types'

export function getUsers() {
  return {
    type: GET_USERS_REQUEST,
  }
}
