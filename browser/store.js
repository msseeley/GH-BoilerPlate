import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const DUMMY_CASE_TYPE = "DUMMY_CASE_TYPE"

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_CASE_TYPE:
      return { ...state }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
)

export default store
