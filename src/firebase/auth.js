import { fb } from "./config";
import "firebase/auth";

export const auth = fb.auth();

auth.onAuthStateChanged(user => {
  console.log("user : ", user);
});
