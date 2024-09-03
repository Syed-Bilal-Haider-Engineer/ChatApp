import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import appReducer from './slices/app'
const rootPersistConfig = {
    key:'root',
    storage,
    keyPreFix:'redux-',
    // whitelist:[],
    // blacklist:[]
}

const rootReducer = combineReducers({
    app: appReducer
})

export {rootPersistConfig,rootReducer}