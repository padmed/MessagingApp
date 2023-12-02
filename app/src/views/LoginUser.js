import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/currentUser";

const LoginUser = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleLogin = () => {
    const { username, password } = formState;

    dispatch(loginUser(username, password));
  };

  return (
    <AuthForm
      buttonText={"Log in"}
      onInputChange={handleInputChange}
      formState={formState}
      onSubmit={handleLogin}
    ></AuthForm>
  );
};

export default LoginUser;
