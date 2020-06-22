import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import persistStore from './persist-store'
import persistReducer from './persist-reducer'

export default (initialState = {}) => {
  const middlewares = [thunk]
  const enhancers = []

  const store = createStore(
    persistReducer(),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers),
  )

  store.asyncReducers = {}

  const persistor = persistStore(store)

  return { store, persistor }
}
