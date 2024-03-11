import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : []
}

const commentSlice = createSlice({
    name : 'comment',
    initialState,
    reducers : {
        getComment : (state, action) => {
            state.data = action.payload
        }
    }
})

export default commentSlice.reducer
export const { createdComment,getComment } = commentSlice.actions