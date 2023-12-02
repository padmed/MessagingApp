import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currentUser from "./currentUser";
import users from "./users";

const rootReducer = combineReducers({
  currentUser: currentUser,
  users: users,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
