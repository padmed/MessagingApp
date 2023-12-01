import Gun from "gun";
import "gun/sea";

export const gun = Gun({ peers: ["http://localhost:3030/gun"] });

export const user = gun.user();
