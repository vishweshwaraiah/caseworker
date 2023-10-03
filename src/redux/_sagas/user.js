import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'helpers/axios'
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from 'redux/_types'

const apiUrl = `/users`
async function getApi() {
  try {
    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    return error
  }
}

function* fetchUsers(action) {
  try {
    const users = yield call(getApi)
    yield put({
      type: GET_USERS_SUCCESS,
      users: users,
    })
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      message: e.message,
    })
  }
}

function* userSaga() {
  yield takeEvery(GET_USERS_REQUEST, fetchUsers)
}

export default userSaga
