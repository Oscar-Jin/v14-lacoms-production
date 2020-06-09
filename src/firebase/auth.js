import { fb } from "./config";
import "firebase/auth";
import store from "../redux/store";
import { UPDATE_USER } from "../redux/reducer";

export const auth = fb.auth();

auth.onAuthStateChanged(user => {
  store.dispatch({
    type: UPDATE_USER,
    payload: user,
  });
});
