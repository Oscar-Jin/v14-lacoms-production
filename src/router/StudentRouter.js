import React from "react";
import { NavLink, Switch, Route, useParams } from "react-router-dom";

// ──────────────────────────────────────────────────────────────── パス ───┐
export const student$info = "/student/info/";
export const student$membership = "/student/membership/";
export const student$subscription = "/student/subscription/";
export const student$ticket = "/student/ticket/";
export const student$reservation = "/student/reservation/";
export const student$payment = "/student/payment/";
// ────────────────────────────────────────────────────────────────────────┘

const StudentRouter = props => {
  const { id } = useParams();

  return (
    <div className="StudentRouter">
      <NavLink to={student$info + id}>Info</NavLink>
      <NavLink to={student$membership + id}>Membership</NavLink>
      <NavLink to={student$subscription + id}>Subscription</NavLink>
      <NavLink to={student$ticket + id}>Ticket</NavLink>
      <NavLink to={student$reservation + id}>Reservation</NavLink>
      <NavLink to={student$payment + id}>Payment</NavLink>
      <Switch>
        <Route path={student$info + ":id"} />
        <Route path={student$membership + ":id"} />
        <Route path={student$subscription + ":id"} />
        <Route path={student$ticket + ":id"} />
        <Route path={student$reservation + ":id"} />
        <Route path={student$payment + ":id"} />
      </Switch>
    </div>
  );
};

export default StudentRouter;
