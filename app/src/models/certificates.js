import { SEA } from "gun";
import "gun/sea";
import { putCertificate } from "../services/contacts";

export const allowContactRequests = async (currentUser) => {
  const certificateOwner = currentUser;
  if (certificateOwner) {
    const keys = {
      ...certificateOwner.keys,
      pub: certificateOwner.keys.pub.slice(1),
    };

    const cert = await SEA.certify(
      "*",
      { "#": { "*": "contactRequests", "+": "*" } },
      keys,
    );

    putCertificate(cert);
  }
};
