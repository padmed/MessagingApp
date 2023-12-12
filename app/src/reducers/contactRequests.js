import { createSlice } from "@reduxjs/toolkit";
import { gun } from "../models";
import { getUserFromLocalStrg } from "../utils/helpers";

const contactRequestsSlice = createSlice({
  name: "contactRequests",
  initialState: [],
  reducers: {
    saveRequest: (state, action) => {
      const duplicate = state.find(
        (req) => req.sender === action.payload.sender,
      );

      if (!duplicate) {
        return [...state, action.payload];
      }

      return state;
    },

    clearRequests: () => {
      return [];
    },
  },
});

export default contactRequestsSlice.reducer;
export const { saveRequest, clearRequests } = contactRequestsSlice.actions;

export const getContactRequests = () => {
  return async (dispatch) => {
    const user = getUserFromLocalStrg();
    const key = user.keys.pub;

    await gun
      .user(key)
      .get("contactRequests")
      .get("inbox")
      .open((data) => {
        const requests = Object.values(data);
        requests.map((req) => {
          dispatch(saveRequest(req));
        });
      });
  };
};
