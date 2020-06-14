import React from "react";
import moment from "moment";
import TableTickets from "../table/TicketsTable";
import ButtonAddSingleTicket from "../button/TicketAddSingleButton";
import "../style/_studentTicketModule.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterSubscriptions } from "../redux/selector";
import { useHasMembership } from "./StudentSubscriptionModule";

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
        <tbody></tbody>
      </table>
    </div>
  );
};

const subscriptionsRows = subscriptions => {
  if (subscriptions === undefined) {
    throw new Error("subscriptions must be provided");
  }

  const rows = subscriptions.map(subscription => subscription);
};
