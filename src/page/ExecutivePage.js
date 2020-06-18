import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import ExecutiveTimetableModule from "../module/ExecutiveTimetableModule";

import "../style/_executivePage.scss";
import BugsAndIssuesPage from "./BugsAndIssuesPage";

// ──────────────────────────────────────────────────────────────── パス ───┐
export const executive$timetable = "/executive/timetable/";
export const executive$centralStation = "/executive/central-station/";
export const executive$bugs = "/executive/bugs/";
// ────────────────────────────────────────────────────────────────────────┘

const ExecutivePage = () => {
  return (
    <div className="ExecutivePage">
      <div className="navlinks">
        <NavLink to={executive$timetable}>Timetable 時間割</NavLink>
        <br />
        <NavLink to={executive$centralStation}>
          Central Station 月間一斉発券
        </NavLink>
        <br />
        <NavLink to={executive$bugs}>Bugs and Issues 不具合</NavLink>
      </div>
      <Switch>
        <Route
          path={executive$timetable}
          component={ExecutiveTimetableModule}
        />
        <Route path={executive$bugs} component={BugsAndIssuesPage} />
        <Route>
          <p>Under Development...</p>
        </Route>
      </Switch>
    </div>
  );
};

export default ExecutivePage;
