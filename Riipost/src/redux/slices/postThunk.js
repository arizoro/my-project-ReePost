
//! Example react async thunk <<<<<<<

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchData = createAsyncThunk("fetch/data", async () => {
  try {
    const result = await axios.get(`${baseUrl}api/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem('token')
      },
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default postsSlice.reducer