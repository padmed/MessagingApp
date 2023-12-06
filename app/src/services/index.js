import { gun } from "../models/index";
import "gun/sea";

const getContactReqCert = (reciever) => {
  return gun.get(reciever.key).get("certs").get("contactRequestsCert").then();
};

export const sendContactRequest = (requestObj) => {
  const { reciever } = requestObj;
  const certificatePromise = getContactReqCert(reciever);

  certificatePromise.then((certificate) => {
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
