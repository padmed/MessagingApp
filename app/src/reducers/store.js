import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currentUser from "./currentUser";
import users from "./users";
import contactRequests from "./contactRequests";

const rootReducer = combineReducers({
  currentUser,
  users,
  contactRequests,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
