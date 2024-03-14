import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        profile : [],
        profileId: []
    },
    reducers : {
        getUser : (state, action)=> {
            state.profile = action.payload
        },
        createUser : (state,action) => {
            state.profile = action.payload
        },
        setProfileId : (state, action) => {
            state.profileId = action.payload
        }
    }
})

export const {getUser , createUser , setProfileId} = profileSlice.actions
export default profileSlice.reducer