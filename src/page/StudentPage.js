import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { findStudent } from "../redux/selector";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import StudentInfoModule from "../module/StudentInfoModule";
import StudentMembershipModule from "../module/StudentMembershipModule";
import StudentPaymentModule from "../module/StudentPaymentModule";
import StudentSubscriptionModule from "../module/StudentSubscriptionModule";
import StudentReservationModule from "../module/StudentReservationModule";
import StudentTicketModule from "../module/StudentTicketModule";

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
  const { lastName_kanji, firstName_kanji, birthdate } = useSelector(state =>
    findStudent(state, id)
  );

  return lastName_kanji ? (
    <div className="StudentPage">
      <h1 style={{ display: "inline-block", paddingRight: "1rem" }}>
        {lastName_kanji} {firstName_kanji}
      </h1>
      <span style={{ marginRight: "1rem" }}>
        {birthdate
          ? moment("2020-08-15").diff(moment(birthdate), "years") + "歳"
          : ""}
      </span>
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
        <Route
          path={student$subscription + ":id"}
          component={StudentSubscriptionModule}
        />
        <Route path={student$ticket + ":id"} component={StudentTicketModule} />
        <Route
          path={student$reservation + ":id"}
          component={StudentReservationModule}
        />
        <Route
          path={student$payment + ":id"}
          component={StudentPaymentModule}
        />
      </Switch>
    </div>
  ) : (
    <div />
  );
};

export default StudentPage;
