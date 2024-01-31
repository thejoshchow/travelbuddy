import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import authReducer from './auth/authSlice';
import { itemsApi } from '../services/itemsApi';
import { tripsApi } from '../features/trips/tripsApi';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [
            authApi.middleware,
            itemsApi.middleware,
            tripsApi.middleware,
        ])
})

export default store;
