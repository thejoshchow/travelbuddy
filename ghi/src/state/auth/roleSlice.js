import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        buddy: false,
        admin: false,
    },
    reducers: {
        setRoles: (state, {payload : {buddy, admin}}) => {
            state.buddy = buddy
            state.admin = admin
        }
    }
})

export const { setRoles } = roleSlice.actions
export const getRoles = (state) => state.roles

export default roleSlice.reducer