import RegisterUser from "./views/RegisterUser";
import LoginUser from "./views/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton";
import ContactSearchBar from "./components/ContactSearchBar";
import { initUsers } from "./reducers/users";
import { authUser } from "./reducers/currentUser";
import { useEffect } from "react";
import { user } from "./models";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());

    // If the page is refreshed a user is logged in the app anyway
    const authedUserStr = window.localStorage.getItem("authedUser");
    const authedUserObj = JSON.parse(authedUserStr);
    if (authedUserObj) {
      dispatch(authUser(authedUserObj));
    }
  }, []);

  useEffect(() => {
    const initRequests = async () => {
      if (currentUser) {
        user
          .get("contactRequests")
          .once()
          .map((reqs) => {
            console.log(reqs);
          });
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
