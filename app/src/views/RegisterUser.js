import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/currentUser";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleRegistration = async () => {
    const { username, password } = formState;
    dispatch(registerUser(username, password));
  };

  return (
    <AuthForm
      buttonText={"Sign up"}
      onSubmit={handleRegistration}
      onInputChange={handleInputChange}
      formState={formState}
    ></AuthForm>
  );
};

export default RegisterUser;
