import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        profile : []
    },
    reducers : {
        getUser : (state, action)=> {
            state.profile = action.payload
        },
        createUser : (state,action) => {
            state.profile = action.payload
        }
    }
})

export const {getUser , createUser} = profileSlice.actions
export default profileSlice.reducer