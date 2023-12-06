import { useState } from "react";
import { useSelector } from "react-redux";
import { gun } from "../models";

const ContactSearchBar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);
  const [usersFound, setUsersFound] = useState([]);

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    const filteredUsers = users.filter((user) => {
      if (user.alias) {
        return user.alias.includes(searchValue);
      }
    });

    setUsersFound(filteredUsers);
  };

  const handleSendRequest = async (key, alias) => {
    const sender = { key: currentUser.key, alias: currentUser.alias };
    const reciever = { key, alias };
    const requestObj = { sender, reciever, status: "pending" };

    gun
      .get("users")
      .get(key)
      .get("contactRequests")
      .put(requestObj, (ack) => {
        if (ack.err) {
          console.log("Error while sending contact request", ack.err);
        } else {
          console.log("Contact request sent", ack);
        }
      });
  };

  return (
    <>
      <input
        placeholder="Search a contact"
        onChange={handleInputChange}
      ></input>

      {usersFound.map((user) => (
        <ul key={user.key}>
          <li>
            <>{user.alias}</>
            <button onClick={() => handleSendRequest(user.key, user.alias)}>
              Send request
            </button>
          </li>
        </ul>
      ))}
    </>
  );
};

export default ContactSearchBar;
