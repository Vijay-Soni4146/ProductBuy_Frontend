import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { getAuthHeader, removeTokenCookie } from "../../utils/Tools";
import { setGlobalAuth } from "../reducers/users";
import { removeAuth, removeUser, setAuth, setUser, getAuth } from "../../Auth";
import { errorGlobal, successGlobal } from "../reducers/notifications";

const API = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ name, email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${API}/users/register`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(request.data);
      if (request.data.status == 500) {
        // console.log(request.data.message);
        dispatch(errorGlobal(request.data.message));
        return { data: "" };
      } else {
        // console.log(request.data.User);
        dispatch(successGlobal("Registered Successfully"));
        return { data: request.data.User, auth: false };
      }
    } catch (err) {
      dispatch(
        errorGlobal("Failed to register! Please try again after sometime.")
      );
      throw err;
    }
  }
);

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${API}/users/login`, {
        email: email,
        password: password,
      });
      if (request.data) {
        setAuth(request.data.token);
        setUser(request.data.user);
      }
      dispatch(successGlobal("Welcome!"));
      return { data: request.data.user, auth: true };
    } catch (err) {
      dispatch(errorGlobal(request.data.message));
      throw err;
    }
  }
);

export const isAuth = createAsyncThunk("users/isAuth", async () => {
  //   try {
  //     const request = await axios.get("/api/auth/isauth", getAuthHeader());
  //     return { data: request.data, auth: true };
  //   } catch (err) {
  //     return { data: {}, auth: false };
  //   }
});

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    await axios.post(`${API}/users/logout`, {}, getAuthHeader());
    removeAuth();
    removeUser();
  } catch (err) {
    dispatch(errorGlobal("Please try again after sometime."));
    throw err;
  }
});

export const accountVerify = createAsyncThunk(
  "users/accountVerify",
  async (token, { dispatch, getState }) => {
    try {
      const user = getState().users.auth;
      await axios.get(`/api/users/verify?validation=${token}`);

      if (user) {
        dispatch(setVerify());
      }
    } catch (err) {
      throw err;
    }
  }
);

export const changeEmail = createAsyncThunk(
  "users/changeEmail",
  async (data, { dispatch }) => {
    try {
      const request = await axios.patch(
        `/api/users/email`,
        { email: data.email, newemail: data.newemail },
        getAuthHeader()
      );
      return {
        email: request.data.user.email,
        verified: false,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (data, { dispatch }) => {
    try {
      const profile = await axios.patch(
        `/api/users/profile`,
        data,
        getAuthHeader()
      );
      return {
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
        age: profile.data.age,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getAuth()}` } };
};
