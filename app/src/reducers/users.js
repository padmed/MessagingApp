import { createSlice } from "@reduxjs/toolkit";
import { gun } from "../models";
import "gun/lib/open.js";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    saveUser: (state, action) => {
      const key = action.payload.key;
      const isDuplicate = state.find((user) => user.key === key); // Checks if the user is already in the state

      if (!isDuplicate && action.payload.alias) {
        return [...state, action.payload];
      }
    },
  },
});

export default usersSlice.reducer;

export const { saveUser } = usersSlice.actions;

export const initUsers = () => {
  return async (dispatch) => {
    // Gets all users from the 'users' node
    gun.get("users").open((data) => {
      const users = Object.values(data);
      users.map((user) => {
        dispatch(saveUser(user));
      });
    });
  };
};
