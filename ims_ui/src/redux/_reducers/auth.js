import {
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from 'redux/_types'

const initialState = {
  jwtToken: '',
  userEmail: '',
  userName: '',
  userMobile: '',
  userAge: '',
  userSex: '',
  loading: false,
  error: '',
}

function auth(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        ...action.details,
        loading: false,
      }
    case SIGNIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...action.details,
        loading: false,
      }
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        ...action.details,
        loading: false,
      }
    case AUTH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export default auth
