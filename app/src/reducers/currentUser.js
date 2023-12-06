import { createSlice } from "@reduxjs/toolkit";
import { user } from "../models";
import { saveInAllUsers, saveInLocalStrg } from "../utils/helpers";
import { allowContactRequests } from "../models/certificates";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    authUser: (state, action) => {
      // Object contains the alias and the keys of a user
      const currentUserObject = action.payload;
      return currentUserObject;
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { authUser, logoutUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

export const loginUser = (alias, password) => {
  return async (dispatch) => {
    user.auth(alias, password, async (ack) => {
      if (ack.err) {
        console.error("Authentication failed", ack.err);
      } else {
        const currentUserObject = {
          alias,
          keys: { ...ack.sea, pub: "~" + ack.sea.pub },
        };
        // If the page is refreshed user is still in the app
        saveInLocalStrg(currentUserObject);

        // Sets certificate for exchanging contact requests
        await allowContactRequests(currentUserObject);
        console.log("Authentication succesfull");

        dispatch(authUser(currentUserObject));
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
        // Saves a registered user under 'users' node
        saveInAllUsers(alias, key);
        console.log("User created succesfully", ack.pub);

        // After the registration user is logged in the app
        dispatch(loginUser(alias, password));
      }
    });
  };
};
