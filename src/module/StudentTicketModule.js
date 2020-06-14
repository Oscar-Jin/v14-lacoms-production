import React from "react";
import moment from "moment";
import TableTickets from "../table/TicketsTable";
import ButtonAddSingleTicket from "../button/TicketAddSingleButton";
import "../style/_studentTicketModule.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterSubscriptions, filterTickets } from "../redux/selector";
import { useHasMembership, localizePlan } from "./StudentSubscriptionModule";
import { $plan } from "../template/subscription";
import { $type, createTicketWith } from "../template/ticket";
import { cloudCreate, cloudUpdate } from "../firebase/firestore";

const StudentTicketModule = () => {
  const hasMembership = useHasMembership();

  if (hasMembership) {
    return (
      <div className="StudentTicketModule">
        <TableTickets />

        <SingleTicketVendor />
        <BundleTicketVendor />
      </div>
    );
  } else {
    return (
      <div className="StudentTicketModule">
        <h2>会員情報がありません</h2>
        <h3>Please create Membership.</h3>
      </div>
    );
  }
};

export default StudentTicketModule;

const SingleTicketVendor = () => {
  const thisMonth = moment().format("YYYY-MM");
  const nextMonth = moment().add(1, "month").format("YYYY-MM");
  const [month, setMonth] = useState(thisMonth);

  return (
    <div className="SingleTicketVendor">
      <h3>自動券売機（補講の追加）</h3>
      <label>利用する月：</label>
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value={thisMonth}>{thisMonth}</option>
        <option value={nextMonth}>{nextMonth}</option>
      </select>
      <span>{moment(month).format("M月利用")}</span>
      <ButtonAddSingleTicket monthSelected={month} />
    </div>
  );
};

const BundleTicketVendor = () => {
  const { id } = useParams();
  const subscriptions = useSelector(state => filterSubscriptions(state, id));

  return (
    <div className="BundleTicketVendor">
      <h3>定期券発行機（プラン）</h3>
      <table>
        <tbody>{subscriptionsRows(subscriptions)}</tbody>
      </table>
    </div>
  );
};

const subscriptionsRows = subscriptions => {
  if (subscriptions === undefined) {
    throw new Error("subscriptions must be provided");
  }

  const rows = subscriptions.map(subscription => {
    const { iso8601, plan, isTicketed, id } = subscription;
    return (
      <tr key={id}>
        <td>{moment(iso8601).format("YYYY-MM")}</td>
        <td>{localizePlan(plan)}</td>
        <td>{plan === $plan.none ? "" : isTicketed ? "発券済" : "未発券"}</td>
        <td>
          <ButtonIssueBundledTickets subscription={subscription} />
        </td>
      </tr>
    );
  });

  return rows;
};

const clone = require("rfdc")();

const ButtonIssueBundledTickets = props => {
  const { subscription } = props;
  if (subscription === undefined) {
    throw new Error("subscription must be provided");
  }

  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    iso8601,
    plan,
    isTicketed,
    uid,
  } = subscription;
  const tickets = useSelector(state => filterTickets(state, uid));

  const issueBundle = () => {
    const numberOfTickes = numberOfTicketsFrom(plan);
    const subscriptionCloned = clone(subscription);

    if (bundledTicketsAlreadyExists(tickets, iso8601)) {
      throw new Error("bundled tickets already exist!");
    }

    for (let i = 0; i < numberOfTickes; i++) {
      const ticket = createTicketWith({
        lastName_kanji,
        firstName_kanji,
        lastName_hiragana,
        firstName_hiragana,
        uid,
        iso8601,
        type: $type.subscriptionBundle,
      });

      cloudCreate(ticket);
    }

    subscriptionCloned.isTicketed = true;
    cloudUpdate(subscriptionCloned);
  };

  const diffInDays = moment(iso8601).diff(moment(), "days");

  if (isTicketed) {
    return (
      <button className="ButtonIssueBundledTickets" disabled>
        発券済です
      </button>
    );
  } else if (diffInDays > 15) {
    return (
      <button className="ButtonIssueBundledTickets" disabled>
        まだ発券できません
      </button>
    );
  } else {
    return (
      <button
        className="ButtonIssueBundledTickets"
        hidden={plan === $plan.none}
        onClick={issueBundle}
      >
        定期券を発行する
      </button>
    );
  }
};

const numberOfTicketsFrom = plan => {
  if (plan === undefined) {
    throw new Error("plan must be provided");
  }

  switch (plan) {
    case $plan.standard:
      return 4;
    case $plan.standardPlus:
      return 6;
    case $plan.fast:
      return 8;
    case $plan.extremelyFast:
      return 12;
    default:
      throw new Error("plan not defined");
  }
};

const bundledTicketsAlreadyExists = (tickets, iso8601) => {
  if (tickets === undefined || iso8601 === undefined) {
    throw new Error("tickets, iso8601 must be provided");
  }

  const duplicatedTicket = tickets.find(
    ticket =>
      ticket.type === $type.subscriptionBundle && ticket.iso8601 === iso8601
  );

  return !!duplicatedTicket ? true : false;
};
