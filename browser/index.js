import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'redux'
import store from './store'
import './index.css'

render(
  <Provider store={store}>
    <h1>WELCOME TO GH-BOILERPLATE!</h1>
  </Provider>,
  document.getElementById('app'))

