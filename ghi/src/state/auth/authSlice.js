import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

const initialState = {
    token: token
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload
            localStorage.setItem("token", payload)
        },
        deleteToken: (state) => {
            state.token = null
            localStorage.removeItem("token")
        }
    },
})

export const { setToken, deleteToken } = authSlice.actions
export const selectToken = (state) => state.auth.token

export default authSlice.reducer;