import { createStore, combineReducers } from 'redux'
import { users } from './users.reducers'
import state from './state'

const reducerList = { users }

const reducers = combineReducers(reducerList)

export const store = createStore(reducers, state)