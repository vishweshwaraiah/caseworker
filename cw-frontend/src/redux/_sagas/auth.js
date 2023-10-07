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

const signinUrl = `/users`
async function signinApi(payload) {
  try {
    const response = await axios.post(signinUrl, payload)
    return response.data
  } catch (error) {
    return error
  }
}

const signupUrl = `/users`
async function signupApi(payload) {
  try {
    const response = await axios.post(signupUrl, payload)
    return response.data
  } catch (error) {
    return error
  }
}

function* signinUser(action) {
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

function* signupUser(action) {
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
  yield takeEvery(SIGNIN_USER_REQUEST, signinUser)
}

export function* signupSaga() {
  yield takeEvery(SIGNUP_USER_REQUEST, signupUser)
}

export default authSaga
