import { useState } from "react";
import { useSelector } from "react-redux";
import { gun } from "../models";

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
    const sender = { key: currentUser.keys.pub, alias: currentUser.alias };
    const reciever = { key: contactKey, alias: contactAlias };
    const requestObj = {
      [sender.alias]: { sender, reciever, status: "pending" },
    };

    // Retrieves a certificate for sending requests
    gun
      .get(reciever.key)
      .get("certs")
      .get("contactRequestsCert")
      .then((certificate) => {
        // Puts the request in 'user/contactRequests' node
        gun
          .get(reciever.key)
          .get("contactRequests")
          .put(
            requestObj,
            (ack) => {
              if (ack.err) {
                console.log("Error while sending contact request", ack.err);
              } else {
                console.log("Contact request sent", ack);
              }
            },
            { opt: { cert: certificate } },
          );
      });
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
