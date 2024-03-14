import { createSlice, isPending } from "@reduxjs/toolkit";



const initialState = {
    users : [],
    user : false
}

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        getAllUser : (state,action) => {
            state.users = action.payload
        },
        setUser : (state, action) => {
            state.user = true
        }
    }
})


export const { getAllUser, setUser} = usersSlice.actions
export default usersSlice.reducer
