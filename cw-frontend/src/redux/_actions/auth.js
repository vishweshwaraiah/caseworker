import { SIGNIN_USER_REQUEST, SIGNUP_USER_REQUEST } from 'redux/_types'

export const signupRequest = (userDetails) => ({
  type: SIGNUP_USER_REQUEST,
  payload: userDetails,
})

export const signinRequest = (userCreds) => ({
  type: SIGNIN_USER_REQUEST,
  payload: userCreds,
})
