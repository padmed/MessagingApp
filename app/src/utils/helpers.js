export const saveInLocalStrg = (userObj) => {
  const authUserStr = JSON.stringify(userObj);
  window.localStorage.setItem("authedUser", authUserStr);
};

export const getUserFromLocalStrg = () => {
  const user = JSON.parse(window.localStorage.getItem("authedUser"));
  return user;
};
