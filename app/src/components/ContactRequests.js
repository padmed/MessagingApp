import { useSelector } from "react-redux";

const ConactRequests = () => {
  const requests = useSelector((state) => state.contactRequests);
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      {requests.length > 0 && <h3>requests</h3>}
      <ul>
        {requests.map((req) => {
          if (req.sender && req.reciever === currentUser.keys.pub) {
            return <li key={req.sender}>{req.senderAlias}</li>;
          }
        })}
      </ul>
    </>
  );
};

export default ConactRequests;
