
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userlistPage = createAsyncThunk(
  'users/userlistPage',
  async ({ limit, skip }) => {
    const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    return response.data;
  }
);

const initialState = {
  userList: {
    users: [],
    total: 0,
    currentPage: 0,
    totalPages: 0,
    error: null,
  },
  userDetail: {},
};

const authReducerSlice = createSlice({
  name: 'auth/userlist',
  initialState: initialState,
  reducers: {
    getAllUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userlistPage.fulfilled, (state, action) => {
      state.userList.users = [...state.userList.users, ...action.payload.users];
      state.userList.total = action.payload.total;
      state.userList.currentPage = action.payload.skip / action.payload.limit;
      state.userList.totalPages = Math.ceil(action.payload.total / action.payload.limit);
    });
    builder.addCase(userlistPage.rejected, (state, action) => {
      state.userList.error = action.error.message;
    });
  }
});

export const { getAllUserList } = authReducerSlice.actions;
export default authReducerSlice.reducer;
