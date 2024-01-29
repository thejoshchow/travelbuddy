import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import authReducer from './auth/authSlice';
import { itemsApi } from './items/itemsApi';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [
            authApi.middleware,
            itemsApi.middleware,
        ])
})

export default store;