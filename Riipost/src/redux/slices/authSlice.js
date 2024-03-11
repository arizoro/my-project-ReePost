import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login : false
}
const authSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        loginUser : (state, action) => {
            state.login = true
        },
        logOut : (state) => {
            state.login = {}
        }
    }
})

export default authSlice.reducer
export const { loginUser, logOut } = authSlice.actions