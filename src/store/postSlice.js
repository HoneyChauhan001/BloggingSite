import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
        },
        removePost: (state) => {
        }
    }
})

export const { addPost, removePost } = postSlice.actions

export default postSlice.reducer