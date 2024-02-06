import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import authReducer from './auth/authSlice';
import { itemsApi } from '../services/itemsApi';
import { categoryApi } from '../services/categoryApi';
import { buddiesApi } from '../services/buddiesApi';
import { tripsApi } from '../services/tripsApi';
import { usersApi } from '../services/usersApi';
import rolesReducer from './auth/roleSlice';


const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [buddiesApi.reducerPath]: buddiesApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authReducer,
        roles: rolesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [
            authApi.middleware,
            itemsApi.middleware,
            tripsApi.middleware,
            categoryApi.middleware,
            buddiesApi.middleware,
            usersApi.middleware
        ])
})

export default store;
