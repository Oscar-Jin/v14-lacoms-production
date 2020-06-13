import React, { useState } from "react";
import { auth } from "../firebase/auth";

// depricated
const ButtonLogin = props => {
  const { email, password } = props;
  // ──────────────────────────────────────────────────────── エラーチェック ───┐
  (!email || !password) && console.error("please provide email and password");
  // ────────────────────────────────────────────────────────────────────────┘

  const [loading, setLoading] = useState(false);
  const connectionStarts = () => setLoading(true);
  const completed = () => setLoading(false);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).then(completed);
    connectionStarts();
  };

  const login = (
    <button className="ButtonLogout" onClick={signIn}>
      Login
    </button>
  );
  const connect = (
    <button className=" onClick={signIn}" disabled>
      Connecting...
    </button>
  );

  return <>{loading ? connect : login}</>;
};

export default ButtonLogin;
