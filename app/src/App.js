import RegisterUser from "./views/RegisterUser";
import LoginUser from "./views/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton";
import ContactSearchBar from "./components/ContactSearchBar";
import { initUsers } from "./reducers/users";
import { authUser } from "./reducers/currentUser";
import { useEffect } from "react";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());

    const authedUserStr = window.localStorage.getItem("authedUser");
    const authedUser = JSON.parse(authedUserStr);
    if (authedUser) {
      dispatch(authUser(authedUser.key));
    }
  }, []);

  return (
    <>
      {!currentUser ? (
        <>
          <RegisterUser />
          <LoginUser />
        </>
      ) : (
        <>
          <LogoutButton />
          <ContactSearchBar />
        </>
      )}
    </>
  );
};

export default App;
