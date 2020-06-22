import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { createStore } from 'modules/store'
import { history } from 'router'

import App from './App'

import 'styles/index.styl'

const { store, persistor } = createStore()

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route path='/' component={App} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'),
)
