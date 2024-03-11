import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : [],
    post: [],
    pages : []
}
const postsSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        getPosts : (state,action) => {
            state.data = action.payload
        },
        getDetail : (state, action) => {
            state.post = action.payload
        },
        addPage : (state,action) => {
            const data = state.pages = action.payload
            if(data.page >= data.total_page) return
            if(data){
                data.page++
            }else{
                state.pages.push(action.payload)
            }
            scrollTo({
                behavior: "smooth",
                top: 8,
            })
        },
        minPage : (state,action) => {
            const data = state.pages = action.payload
            if(data.page <= 1) return
            if(data){
                data.page--
            }else{
                state.pages.push(action.payload)
            }
            scrollTo({
                behavior: "smooth",
                top: 8,
            })
        }
    }
})

export const {getPosts, addPage ,minPage, getDetail} = postsSlice.actions
export default postsSlice.reducer