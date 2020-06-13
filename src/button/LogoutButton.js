import React from "react";
import { auth } from "../firebase/auth";

const ButtonLogout = () => {
  const signOut = () => auth.signOut();

  return (
    <button onClick={signOut} className="ButtonLogout">
      Log out
    </button>
  );
};

export default ButtonLogout;
