import { gun } from "../models";

export const saveInAllUsers = (key) => {
  let alias;
  gun
    .user(key)
    .get("alias")
    .once((a) => {
      alias = a;
    });

  gun.get("users").set({ alias, key });
};

export const saveInLocalStrg = (username, key) => {
  const authUserStr = JSON.stringify({ username, key });
  window.localStorage.setItem("authedUser", authUserStr);
};
