import { combineReducers } from 'redux'
import Users from './users'
import Auth from './auth'

const rootReducer = combineReducers({
  users: Users,
  auth: Auth,
})

export default rootReducer
