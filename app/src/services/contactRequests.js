import { gun, user } from "../models/index";
import "gun/sea";

const getContactReqCert = (reciever) => {
  return gun.get(reciever).get("certs").get("contactRequestsCert").then();
};

const putInSentNode = (requestObj, certificate) => {
  const { reciever, sender } = requestObj;
  gun
    .get(sender)
    .get("contactRequests")
    .get("sent")
    .get(reciever)
    .put(
      requestObj,
      (ack) => {
        if (ack.err) {
          console.log(
            "Error while saving contact request in current user node",
            ack.err,
          );
        } else {
          console.log("Contact request saved in current user node");
        }
      },
      { opt: { cert: certificate } },
    );
};

const putInInboxNode = (requestObj, certificate) => {
  const { reciever, sender } = requestObj;
  gun
    .get(reciever)
    .get("contactRequests")
    .get("inbox")
    .get(sender)
    .put(
      requestObj,
      (ack) => {
        if (ack.err) {
          console.log(
            "Error while saving contact request in reciever's node",
            ack.err,
          );
        } else {
          console.log("Contact request saved in reciever's node");
        }
      },
      { opt: { cert: certificate } },
    );
};

export const sendContactRequest = (requestObj) => {
  const { reciever } = requestObj;
  const certificatePromise = getContactReqCert(reciever);
  certificatePromise.then((certificate) => {
    // Puts the request in 'sender/contactRequests/sent' node
    putInSentNode(requestObj, certificate);
    // Puts the request in 'reciever/contactRequests/inbox' node
    putInInboxNode(requestObj, certificate);
  });
};

export const putCertificate = (cert) => {
  user
    .get("certs")
    .get("contactRequestsCert")
    .put(cert, () => {
      console.log("Contact requests certificate saved");
    });
};
