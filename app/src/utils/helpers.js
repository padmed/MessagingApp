export const saveInLocalStrg = (userObj) => {
  const authUserStr = JSON.stringify(userObj);
  window.localStorage.setItem("authedUser", authUserStr);
};
