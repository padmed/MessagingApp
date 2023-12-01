import React from "react";
import PropTypes from "prop-types";

const AuthForm = ({
  formState,
  onInputChange,
  onSubmit,
  placeholder1 = "Username",
  placeholder2 = "Password",
  buttonText,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder={placeholder1}
        onChange={handleInputChange}
        value={formState.username}
      />
      <input
        name="password"
        placeholder={placeholder2}
        onChange={handleInputChange}
        value={formState.password}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

AuthForm.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  buttonText: PropTypes.string,
};

export default AuthForm;
