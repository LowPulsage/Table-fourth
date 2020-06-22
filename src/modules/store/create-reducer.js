import { sessionReducer } from 'modules/session/session-reducers'
import { combineReducers } from 'redux'

const createReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
    source: sessionReducer,
  })
export default createReducer
