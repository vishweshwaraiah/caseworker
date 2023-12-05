import { all } from 'redux-saga/effects'
import userSaga from './users'
import { userDetailSaga, signinSaga, signupSaga } from './auth'

export default function* rootSaga() {
  yield all([userSaga(), signinSaga(), signupSaga(), userDetailSaga()])
}
