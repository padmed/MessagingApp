import RegisterUser from "./views/RegisterUser";
import LoginUser from "./views/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton";
import ContactSearchBar from "./components/ContactSearchBar";
import { initUsers } from "./reducers/users";
import { authUser } from "./reducers/currentUser";
import { useEffect } from "react";
import ConactRequests from "./components/ContactRequests";
import { getContactRequests } from "./reducers/contactRequests";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
    dispatch(getContactRequests());

    // If the page is refreshed a user is logged in the app anyway
    const authedUserStr = window.localStorage.getItem("authedUser");
    const authedUserObj = JSON.parse(authedUserStr);
    if (authedUserObj) {
      dispatch(authUser(authedUserObj));
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
          <ConactRequests />
        </>
      )}
    </>
  );
};

export default App;
