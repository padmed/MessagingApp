import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { user } from "../models";

const LoginUser = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleLogin = () => {
    const { username, password } = formState;

    user.auth(username, password, (ack) => {
      if (ack.err) {
        console.error("Authentication failed", ack.err);
      } else {
        console.log("Authentication succesfull");
      }
    });
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
