import React from "react";
import { auth } from "../firebase/auth";

const LogoutButton = () => {
  const signOut = () => auth.signOut();

  return <button onClick={signOut}>Log out</button>;
};

export default LogoutButton;
