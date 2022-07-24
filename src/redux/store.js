import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import allReducer from './reducer'

const store = createStore(allReducer, applyMiddleware(thunk))

export default store
