import React from "react";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import ButtonLogout from "../button/LogoutButton";
import BadgeServer from "../component/BadgeServer";
import "../style/_reactRouter.scss";
import LoginPage from "../page/LoginPage";
import useCloudSubscribe from "../hook/useCloudSubscribe";
import NotFoundPage from "../page/404Page";
import HomePage from "../page/HomePage";
import StudentPage from "../page/StudentPage";

// ──────────────────────────────────────────────────────────────── パス ───┐
const home = "/";
const student = "/student/:module/:id";
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
        <ButtonLogout />
        <BadgeServer />
        <hr />
        <Switch>
          <Route exact path={home} component={HomePage} />
          <Route path={student} component={StudentPage} />
          {/* Other Routes Not Created Yet */}
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );

  return user ? user.uid ? router : <div /> : <LoginPage />;
};

export default ReactRouter;
