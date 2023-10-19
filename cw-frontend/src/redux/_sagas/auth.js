import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'helpers/axios'
import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from 'redux/_types'

const SIGNIN_URL = `/auth/signin`
const SIGNUP_URL = `/auth/signup`

async function signinApi(payload) {
  try {
    const response = await axios.post(SIGNIN_URL, payload)
    return response.data
  } catch (error) {
    return error
  }
}

async function signupApi(payload) {
  try {
    const response = await axios.post(SIGNUP_URL, payload)
    return response.data
  } catch (error) {
    return error
  }
}

function* signinUserSaga(action) {
  const payload = action.payload
  try {
    const userData = yield call(signinApi, payload)
    yield put({
      type: SIGNIN_USER_SUCCESS,
      userDetails: userData,
    })
  } catch (e) {
    yield put({
      type: SIGNIN_USER_FAILURE,
      message: e.message,
    })
  }
}

function* signupUserSaga(action) {
  const payload = action.payload
  try {
    const userData = yield call(signupApi, payload)
    yield put({
      type: SIGNUP_USER_SUCCESS,
      userDetails: userData,
    })
  } catch (e) {
    yield put({
      type: SIGNUP_USER_FAILURE,
      message: e.message,
    })
  }
}

function* authSaga() {
  yield takeEvery(SIGNIN_USER_REQUEST, signinUserSaga)
}

export function* signupSaga() {
  yield takeEvery(SIGNUP_USER_REQUEST, signupUserSaga)
}

export default authSaga
