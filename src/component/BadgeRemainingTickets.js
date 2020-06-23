import React from "react";

import { useSelector } from "react-redux";
import { filterTickets, filterReservations } from "../redux/selector";
import { $type } from "../template/ticket";

const BadgeRemainingTickets = props => {
  const { id } = checkprops(props);
  const tickets = useSelector(state => filterTickets(state, id));
  const reservations = useSelector(state => filterReservations(state, id));

  let unusedSinglePurchase = null;
  let unusedSubscriptionBundle = null;
  let unusedPastUnused = null;
  let usedThisMonth = null;

  tickets.forEach(ticket => {
    if (!ticket.usedOn) {
      switch (ticket.type) {
        case $type.singlePurchase:
          unusedSinglePurchase += 1;
          break;
        case $type.subscriptionBundle:
          unusedSubscriptionBundle += 1;
          break;
        case $type.pastUnused:
          unusedPastUnused += 1;
          break;
        default:
          throw new Error("undefined ticket type");
      }
    }
    // <--- need to add logic here
    if (ticket.usedOn) {
      const thisYear = 2020;
      const thisMonth = 7;
      const reservation = reservations.find(rv => rv.id === ticket.usedOn);
      if (
        reservation &&
        reservation.year === thisYear &&
        reservation.month === thisMonth
      ) {
        usedThisMonth += 1;
      }
    }
  });

  return (
    <span className="BadgeRemainingTickets subtitle">
      <span
        style={{
          display: "inline-block",
          minWidth: "4rem",
          color: "green",
        }}
      >
        {unusedSubscriptionBundle ? `定期：${unusedSubscriptionBundle}` : ""}
      </span>
      <span
        style={{
          display: "inline-block",
          minWidth: "5rem",
          color: "orange",
        }}
      >
        {unusedSinglePurchase ? `きっぷ：${unusedSinglePurchase}` : ""}
      </span>
      <span
        style={{
          display: "inline-block",
          minWidth: "5rem",
          color: "#50c7c3",
        }}
      >
        {unusedPastUnused ? `整理券：${unusedPastUnused}` : ""}
      </span>
      <span
        style={{
          display: "inline-block",
          minWidth: "5rem",
          color: "darkgray",
        }}
      >
        {usedThisMonth ? `使用：${usedThisMonth}` : ""}
      </span>
    </span>
  );
};

export default BadgeRemainingTickets;

// ────────────────────────────────────────────────────────────── check ───┐
const checkprops = props => {
  const { id } = props;
  if (id === undefined) {
    throw new Error("id must be provided");
  }
  return { id };
};
// ────────────────────────────────────────────────────────────────────────┘
