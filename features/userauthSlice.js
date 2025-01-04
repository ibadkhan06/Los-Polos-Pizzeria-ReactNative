import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,  //
    // isLoading: true, // Add a loading state
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});


export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
