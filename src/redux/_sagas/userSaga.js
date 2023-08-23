import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

const apiUrl = `https://jsonplaceholder.typicode.com/users`
function getApi() {
  return axios
    .get(apiUrl)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

function* fetchUsers(action) {
  try {
    const users = yield call(getApi)
    yield put({
      type: 'GET_USERS_SUCCESS',
      users: users,
    })
  } catch (e) {
    yield put({
      type: 'GET_USERS_FAILED',
      message: e.message,
    })
  }
}

function* userSaga() {
  yield takeEvery('GET_USERS_REQUESTED', fetchUsers)
}

export default userSaga
