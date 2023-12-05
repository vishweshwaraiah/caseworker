import {
  SIGNIN_USER_REQUEST,
  SIGNUP_USER_REQUEST,
  AUTH_USER_REQUEST,
} from 'redux/_types'

export const signupRequest = (userDetails) => ({
  type: SIGNUP_USER_REQUEST,
  payload: userDetails,
})

export const signinRequest = (userCreds) => ({
  type: SIGNIN_USER_REQUEST,
  payload: userCreds,
})

export function getAuthUser() {
  return {
    type: AUTH_USER_REQUEST,
  }
}
