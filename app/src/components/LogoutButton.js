import { useDispatch } from "react-redux";
import { user } from "../models";
import { logoutUser } from "../reducers/currentUser";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    user.leave();
    dispatch(logoutUser());
    window.localStorage.clear();
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
