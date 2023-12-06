import RegisterUser from "./views/RegisterUser";
import LoginUser from "./views/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton";
import ContactSearchBar from "./components/ContactSearchBar";
import { initUsers } from "./reducers/users";
import { authUser } from "./reducers/currentUser";
import { useEffect } from "react";
import { gun } from "./models";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());

    const authedUserStr = window.localStorage.getItem("authedUser");
    const authedUser = JSON.parse(authedUserStr);
    if (authedUser) {
      const { key, alias } = authedUser;
      dispatch(authUser({ key, alias }));
    }
  }, []);

  useEffect(() => {
    const initRequests = async () => {
      if (currentUser) {
        await gun
          .get("users")
          .get(currentUser.key)
          .once((m) => console.log(m));
      }
    };

    initRequests();
  }, [currentUser]);

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
