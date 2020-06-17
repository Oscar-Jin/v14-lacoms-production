import React from "react";
import { useSelector } from "react-redux";
import { filterTickets } from "../redux/selector";
import { $type } from "../template/ticket";

const BadgeRemainingTickets = props => {
  const { id } = checkprops(props);
  const tickets = useSelector(state => filterTickets(state, id));

  let unusedSinglePurchase = null;
  let unusedSubscriptionBundle = null;
  let unusedPastUnused = null;

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
  });

  return (
    <span className="BadgeRemainingTickets">
      <span
        style={{
          display: "inline-block",
          minWidth: "4.5rem",
          color: "green",
        }}
      >
        定期：{unusedSubscriptionBundle}
      </span>
      <span
        style={{
          display: "inline-block",
          minWidth: "5.5rem",
          color: "orange",
        }}
      >
        きっぷ：{unusedSinglePurchase}
      </span>
      <span
        style={{
          display: "inline-block",

          color: "#50c7c3",
        }}
      >
        整理券：{unusedPastUnused}
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
