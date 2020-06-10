import { fb } from "./config";
import "firebase/auth";
import store from "../redux/store";
import { updateUser } from "../redux/action";

export const auth = fb.auth();

auth.onAuthStateChanged(user => {
  store.dispatch(updateUser(user));
});
