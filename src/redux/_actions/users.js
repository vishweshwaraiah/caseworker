import * as type from '../_types'

export function getUsers(users) {
  return {
    type: type.GET_USERS_REQUESTED,
    payload: users,
  }
}
