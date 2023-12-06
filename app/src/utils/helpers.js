import { gun } from "../models";

// Saves a user under 'users' node
export const saveInAllUsers = async (alias, key) => {
  await gun
    .get("users")
    .get(key)
    .put({ alias, key }, (ack) => {
      if (ack.err) {
        console.error("Error while saving user in users database", ack.err);
      } else {
        console.log("User saved in users database");
      }
    });
};

export const saveInLocalStrg = (userObj) => {
  const authUserStr = JSON.stringify(userObj);
  window.localStorage.setItem("authedUser", authUserStr);
};
