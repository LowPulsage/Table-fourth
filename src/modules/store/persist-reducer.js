import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createReducer from './create-reducer'

const persistConfig = {
  key: 'blueline-ticket',
  storage,
  whitelist: ['session'],
}

export default asyncReducers => persistReducer(persistConfig, createReducer(asyncReducers))
