import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from 'redux/_types'

const initialState = {
  token: '',
  email: '',
  pending: false,
  error: '',
}

function auth(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.userDetails.jwtToken,
        email: action.userDetails.userName,
      }
    case SIGNIN_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.message,
      }
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.userDetails.jwtToken,
        email: action.userDetails.userName,
      }
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.message,
      }
    default:
      return state
  }
}

export default auth
