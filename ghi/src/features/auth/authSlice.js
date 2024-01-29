import { createSlice } from '@reduxjs/toolkit'

// const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

const initialState = {
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload.access_token
            // localStorage.setItem("token", action.payload)
        },
        deleteToken: (state) => {
            state.token = initialState
            // localStorage.removeItem("token")
        }
    },
})

export const { setToken, deleteToken } = authSlice.actions

export default authSlice.reducer;