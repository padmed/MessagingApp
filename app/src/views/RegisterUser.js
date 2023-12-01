import AuthForm from "../components/AuthForm";
import { user } from "../models";
import { useState } from "react";

const RegisterUser = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const registerUser = async () => {
    const { username, password } = formState;

    user.create(username, password, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        console.log("User created succesfully", ack.pub);
      }
    });
  };

  return (
    <AuthForm
      buttonText={"Sign up"}
      onSubmit={registerUser}
      onInputChange={handleInputChange}
      formState={formState}
    ></AuthForm>
  );
};

export default RegisterUser;
