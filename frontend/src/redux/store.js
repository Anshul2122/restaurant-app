import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import authSlice from "./authSlice"


import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    user:userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
// Create persistor
export const persistor = persistStore(store);

// Export both store and persistor
export default store;