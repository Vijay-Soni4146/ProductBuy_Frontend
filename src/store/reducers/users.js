import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  isAuth,
  logout,
  changeEmail,
  updateUserProfile,
} from "../actions/users";

let DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    name: null,
  },
  auth: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER_STATE,
  reducers: {
    setGlobalAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      //   .addCase(registerUser.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(registerUser.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.data = action.payload.data;
      //     state.auth = action.payload.auth;
      //   })
      //   .addCase(registerUser.rejected, (state) => {
      //     state.loading = false;
      //   })
      //   SIGN IN
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })
      // IS AUTH
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, (state) => {
        state.loading = false;
      })
      // SIGN OUT
      .addCase(logout.fulfilled, (state) => {
        state.data = DEFAULT_USER_STATE.data;
        state.auth = false;
      })
      // CHANGE EMAIL
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(changeEmail.rejected, (state) => {
        state.loading = false;
      })
      // UPDATE USER PROFILE
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
      });
  },
});

export const { setGlobalAuth } = usersSlice.actions;
export default usersSlice.reducer;
