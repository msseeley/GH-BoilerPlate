import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'redux'

render(
  <Provider>
    <h1>WELCOME TO GH-BOILERPLATE!</h1>
  </Provider>,
  document.getElementById('app'))

