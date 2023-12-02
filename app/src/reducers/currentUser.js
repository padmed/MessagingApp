import { createSlice } from "@reduxjs/toolkit";
import { user } from "../models";
import { saveInAllUsers, saveInLocalStrg } from "../utils/helpers";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    authUser: (state, action) => {
      const key = action.payload;
      return key;
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { authUser, logoutUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

export const loginUser = (username, password) => {
  return (dispatch) => {
    user.auth(username, password, (ack) => {
      if (ack.err) {
        console.error("Authentication failed", ack.err);
      } else {
        const key = ack.soul;
        dispatch(authUser(key));
        saveInLocalStrg(username, key);
        console.log("Authentication succesfull");
      }
    });
  };
};

export const registerUser = (username, password) => {
  return (dispatch) => {
    user.create(username, password, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        const key = ack.pub;
        dispatch(authUser(key));
        saveInAllUsers(key);
        saveInLocalStrg(username, key);
        console.log("User created succesfully", ack.pub);
      }
    });
  };
};
