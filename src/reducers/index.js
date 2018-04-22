import { combineReducers } from 'redux'

import IPFSReducer from './init_ipfs'

const rootReducer = combineReducers({
  ipfs: IPFSReducer
})

export default rootReducer
