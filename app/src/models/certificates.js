import { SEA } from "gun";
import { user } from "./index";
import "gun/sea";

export const allowContactRequests = async (currentUser) => {
  const certificateOwner = currentUser;
  if (certificateOwner) {
    // const pubKey = certificateOwner.keys.pub;
    const keys = {
      ...certificateOwner.keys,
      pub: certificateOwner.keys.pub.slice(1),
    };

    const cert = await SEA.certify(
      "*",
      { "#": { "*": "contactRequests" } },
      keys,
    );

    user
      .get("certs")
      .get("contactRequestsCert")
      .put(cert, () => {
        console.log("Contact requests certificate saved");
      });
  }
};
