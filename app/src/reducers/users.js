import { createSlice } from "@reduxjs/toolkit";
import { gun } from "../models";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    saveUser: (state, action) => {
      const key = action.payload.key;
      const isDuplicate = state.find((user) => user.key === key);

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
    await gun
      .get("users")
      .once()
      .map((user) => {
        dispatch(saveUser(user));
      });
  };
};
