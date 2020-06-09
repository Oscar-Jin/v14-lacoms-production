import React, { useState } from "react";
import { auth } from "../firebase/auth";

const LoginButton = props => {
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

  const login = <button onClick={signIn}>Login</button>;
  const connect = <button disabled>Connecting...</button>;

  return <>{loading ? connect : login}</>;
};

export default LoginButton;
