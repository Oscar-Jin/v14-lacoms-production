import React from "react";
import { useSelector } from "react-redux";
import { findStudent } from "../redux/selector";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import StudentInfoModule from "../module/StudentInfoModule";
import StudentMembershipModule from "../module/StudentMembershipModule";

// ──────────────────────────────────────────────────────────────── パス ───┐
export const student$info = "/student/info/";
export const student$membership = "/student/membership/";
export const student$subscription = "/student/subscription/";
export const student$ticket = "/student/ticket/";
export const student$reservation = "/student/reservation/";
export const student$payment = "/student/payment/";
// ────────────────────────────────────────────────────────────────────────┘

const StudentPage = () => {
  const { id } = useParams();
  const { lastName_kanji, firstName_kanji } = useSelector(state =>
    findStudent(state, id)
  );

  return lastName_kanji ? (
    <div className="StudentPage">
      <h1 style={{ display: "inline-block", paddingRight: "1rem" }}>
        {lastName_kanji} {firstName_kanji}
      </h1>
      <span>
        <NavLink to={student$info + id}>Info</NavLink>
        <NavLink to={student$membership + id}>Membership</NavLink>
        <NavLink to={student$subscription + id}>Subscription</NavLink>
        <NavLink to={student$ticket + id}>Ticket</NavLink>
        <NavLink to={student$reservation + id}>Reservation</NavLink>
        <NavLink to={student$payment + id}>Payment</NavLink>
      </span>
      <Switch>
        <Route path={student$info + ":id"} component={StudentInfoModule} />
        <Route
          path={student$membership + ":id"}
          component={StudentMembershipModule}
        />
        <Route path={student$subscription + ":id"} />
        <Route path={student$ticket + ":id"} />
        <Route path={student$reservation + ":id"} />
        <Route path={student$payment + ":id"} />
      </Switch>
    </div>
  ) : (
    <div />
  );
};

export default StudentPage;
