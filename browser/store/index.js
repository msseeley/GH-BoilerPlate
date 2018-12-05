import axios from 'axios'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import dummyReducer from '../reducers'


const reducer = combineReducers({ dummyReducer })

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
)

export default store
