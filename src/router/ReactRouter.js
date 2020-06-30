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
import "../style/_main.scss";
import AnalyticsPage from "../page/AnalyticsPage";
import ExecutivePage from "../page/ExecutivePage";
import SchedulePage from "../page/SchedulePage";
import LessonPage from "../page/LessonPage";

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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://lacoms-student-center.herokuapp.com/"
        >
          {"🎉Student Center"}
        </a>
        <span>準備中です</span>
        <ButtonLogout />
        <BadgeServer />
        <hr />
        <Switch>
          <Route exact path={home} component={HomePage} />
          <Route path={student} component={StudentPage} />
          <Route path={lesson} component={LessonPage} />
          <Route path={schedule} component={SchedulePage} />
          <Route path={analytics} component={AnalyticsPage} />
          <Route path={executive} component={ExecutivePage} />
          {/* Other Routes Not Created Yet */}
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );

  return user ? user.uid ? router : <div /> : <LoginPage />;
};

export default ReactRouter;
