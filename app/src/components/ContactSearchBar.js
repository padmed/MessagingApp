import { useState } from "react";
import { useSelector } from "react-redux";
import { sendContactRequest } from "../services/contactRequests";

const ContactSearchBar = () => {
  const currentUser = useSelector((state) => state.currentUser); // Holds the alias and the keys of a user
  const users = useSelector((state) => state.users); // Holds all existing users
  const [usersFound, setUsersFound] = useState([]); // Filter state, used to find contacts from search bar

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    const filteredUsers = users.filter((user) => {
      // Checks if the object indeed holds the user data
      if (user.alias) {
        return user.alias.includes(searchValue);
      }
    });

    setUsersFound(filteredUsers);
  };

  const handleSendRequest = async (contactKey, contactAlias) => {
    const sender = currentUser.keys.pub;
    const senderAlias = currentUser.alias;
    const reciever = contactKey;
    const recieverAlias = contactAlias;
    const date = Date.now();
    const requestObj = {
      sender,
      senderAlias,
      reciever,
      recieverAlias,
      status: "pending",
      date,
    };

    sendContactRequest(requestObj);
  };

  return (
    <>
      <input
        placeholder="Search a contact"
        onChange={handleInputChange}
      ></input>

      {usersFound.map((user) => {
        console.log(user);
        return (
          <ul key={user.key}>
            <li>
              <>{user.alias}</>
              <button onClick={() => handleSendRequest(user.key, user.alias)}>
                Send request
              </button>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default ContactSearchBar;
