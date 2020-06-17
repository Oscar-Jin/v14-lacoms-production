import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import ExecutiveTimetableModule from "../module/ExecutiveTimetableModule";

import "../style/_executivePage.scss";

// ──────────────────────────────────────────────────────────────── パス ───┐
export const executive$timetable = "/executive/timetable/";
export const executive$centralStation = "/executive/central-station/";
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
      </div>
      <Switch>
        <Route
          path={executive$timetable}
          component={ExecutiveTimetableModule}
        />
        <Route>
          <p>Under Development...</p>
        </Route>
      </Switch>
    </div>
  );
};

export default ExecutivePage;
