import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import authReducer from './auth/authSlice';
import { itemsApi } from '../services/itemsApi';
import { tripApi } from '../services/tripApi';
import { categoryApi } from '../services/categoryApi';
import { buddiesApi } from '../services/buddiesApi';
import { tripsApi } from '../features/trips/tripsApi';
import { usersApi } from '../services/usersApi';


const store = configureStore({
    reducer: {
        [tripApi.reducerPath]: tripApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [buddiesApi.reducerPath]: buddiesApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [
            authApi.middleware,
            itemsApi.middleware,
            tripsApi.middleware,
            tripApi.middleware,
            categoryApi.middleware,
            buddiesApi.middleware,
            usersApi.middleware
        ])
})

export default store;
