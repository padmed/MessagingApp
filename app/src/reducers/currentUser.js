import { createSlice } from "@reduxjs/toolkit";
import { user } from "../models";
import { saveInAllUsers, saveInLocalStrg } from "../utils/helpers";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    authUser: (state, action) => {
      const { alias, key } = action.payload;
      return { alias, key };
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { authUser, logoutUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

// Update block so that it saves the keys as the currentUser
export const loginUser = (alias, password) => {
  return async (dispatch) => {
    console.log(alias, password);
    user.auth(alias, password, (ack) => {
      if (ack.err) {
        console.error("Authentication failed", ack.err);
      } else {
        console.log(ack.sea);
        const key = ack.soul;
        const alias = user.is.alias;
        dispatch(authUser({ alias, key }));
        saveInLocalStrg(alias, key);
        console.log("Authentication succesfull");
      }
    });
  };
};

export const registerUser = (alias, password) => {
  return async (dispatch) => {
    user.create(alias, password, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        const key = "~" + ack.pub;
        saveInAllUsers(alias, key);
        console.log("User created succesfully", ack.pub);

        dispatch(loginUser(alias, password));
      }
    });
  };
};
