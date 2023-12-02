import { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../models";

const ContactSearchBar = () => {
  const users = useSelector((state) => state.users);
  const [usersFound, setUsersFound] = useState([]);

  const handleInputChange = (e) => {
    const searchValue = e.target.value;

    const filteredUsers = users.filter((user) => {
      return user.alias.includes(searchValue);
    });

    setUsersFound(filteredUsers);
  };

  console.log(user.is);
  return (
    <>
      <input
        placeholder="Search a contact"
        onChange={handleInputChange}
      ></input>

      {usersFound.map((user) => (
        <ul key={user.key}>
          <li>{user.alias}</li>
        </ul>
      ))}
    </>
  );
};

export default ContactSearchBar;
