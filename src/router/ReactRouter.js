import React from "react";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";
import BadgeServer from "../component/BadgeServer";
import "../style/_reactRouter.scss";
import LoginPage from "../page/LoginPage";
import useCloudSubscribe from "../hook/useCloudSubscribe";

// ──────────────────────────────────────────────────────────────── パス ───┐
const home = "/";
const lesson = "/lesson";
const schedule = "/schedule";
const analytics = "/analytics";
const executive = "/executive";
// ────────────────────────────────────────────────────────────────────────┘

const ReactRouter = () => {
  const user = useCloudSubscribe();

  const router = (
    <div className="ReactRouter">
      <BrowserRouter>
        <NavLink to={home}>Home</NavLink>
        <NavLink to={lesson}>Lesson</NavLink>
        <NavLink to={schedule}>Schedule</NavLink>
        <NavLink to={analytics}>Analytics</NavLink>
        <NavLink to={executive}>Executive</NavLink>
        <LogoutButton />
        <BadgeServer />
        <hr />
        <Switch>
          <Route exact path={home} />
          {/* <Route path={lesson} />
          <Route path={schedule} />
          <Route path={analytics} />
          <Route path={executive} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );

  return user ? user.uid ? router : <div /> : <LoginPage />;
};

export default ReactRouter;
