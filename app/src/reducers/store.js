import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currentUser from "./currentUser";

const rootReducer = combineReducers({
  currentUser: currentUser,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
