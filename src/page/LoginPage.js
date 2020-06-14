import React, { useState } from "react";
import { auth } from "../firebase/auth";

import "../style/_loginPage.scss";
import ServerBadge from "../component/BadgeServer";

const logo = "LACOMS Pole Star";
const heading = "Please Login";
const hint = "Forgot password? Ask our full-time employee for assistance.";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const loadingStarts = () => setLoading(true);
  const loadingComplete = () => setLoading(false);

  const signIn = event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const tip = document.getElementById("tip");

    auth
      .signInWithEmailAndPassword(email, password)
      .then(loadingComplete)
      .catch(error => {
        tip.innerText = "Error: " + error.code;
        loadingComplete();
      });
    loadingStarts();
  };

  const login = <button type="submit">Login</button>;
  const connect = <button disabled>Connecting...</button>;

  return (
    <div className="LoginPage">
      <h1 id="heading">{logo}</h1>
      <h2 id="heading">{heading}</h2>
      <ServerBadge />
      <hr />

      <form onSubmit={signIn}>
        {/* target[0] */}
        <input type="email" id="email" placeholder="email:" required />
        {/* target[1] */}
        <input type="password" id="password" placeholder="password:" required />
        {loading ? connect : login}
      </form>
      <p id="tip">{hint}</p>
    </div>
  );
};

export default LoginPage;
