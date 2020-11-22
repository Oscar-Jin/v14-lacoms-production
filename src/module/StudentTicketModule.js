import React from "react";
import moment from "moment";
import Modal from "react-modal";
import TableTickets from "../table/TicketsTable";
import ButtonAddSingleTicket from "../button/TicketAddSingleButton";
import "../style/_studentTicketModule.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  filterSubscriptions,
  filterTickets,
  findStudent,
} from "../redux/selector";
import { useHasMembership, localizePlan } from "./StudentSubscriptionModule";
import { $plan } from "../template/subscription";
import { $type, createTicketWith, localizeType } from "../template/ticket";
import { cloudCreate, cloudUpdate } from "../firebase/firestore";
import { style } from "../modal/AddStudentModal";

const StudentTicketModule = () => {
  const hasMembership = useHasMembership();

  if (hasMembership) {
    return (
      <div className="StudentTicketModule">
        <TableTickets />

        <AdvandcedTicketVendor />
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

const AdvandcedTicketVendor = () => {
  const [showMARS, setShowMARS] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const toggleMARS = () => {
    setShowMARS(!showMARS);
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  return (
    <div className="AdvandcedTicketVendor fr">
      {/* <h3>精算所・駅係員室（管理者向け）</h3>
      <p>
        こちらは管理者向け専用機能です。一般に使用することはありません。
      </p> */}
      <button onClick={toggleMARS} disabled={showMARS}>
        MARSを起動する
      </button>
      <button hidden={!showMARS} onClick={toggleTerminal}>
        端末に接続する
      </button>

      <MARSTerminalModal
        showTerminal={showTerminal}
        setShowTerminal={setShowTerminal}
        toggleMARS={toggleMARS}
      />
    </div>
  );
};

const MARSTerminalModal = props => {
  const { showTerminal, setShowTerminal, toggleMARS } = props;
  if (
    showTerminal === undefined ||
    setShowTerminal === undefined ||
    toggleMARS === undefined
  ) {
    throw new Error(
      "showTerminal, setShowTerminal, toggleMARS must be provided"
    );
  }

  const { id } = useParams();
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
  } = useSelector(state => findStudent(state, id));

  const [month, setMonth] = useState(null);
  const [type, setType] = useState("");
  const [willExpire, setWillExpire] = useState(true);

  const close = () => {
    setMonth(null);
    setType("");
    setShowTerminal(false);
    toggleMARS();
  };

  const add = () => {
    const ticket = createTicketWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
      iso8601: moment(month).format("YYYY-MM-DD"),
      type: type,
      willExpire: willExpire,
    });

    cloudCreate(ticket);
    close();
  };

  return (
    <div className="MARSTerminalModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={showTerminal}
        style={style}
      >
        <h3 className="ib">MARS</h3>
        <span className="ml2">Multi Access seat Reservation System</span>
        <p className="banner">
          管理者向け機能です。一般に使用しないでください。
        </p>
        <hr />
        <table className="MARSTable">
          <tbody>
            <tr>
              <td>月：</td>
              <td>
                <DatePicker
                  selected={month}
                  onChange={setMonth}
                  dateFormat="yyyy/MM"
                  showMonthYearPicker
                />
              </td>
            </tr>
            <tr>
              <td>プラン：</td>
              <td>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="" disabled></option>
                  <option value={$type.pastUnused}>
                    {localizeType($type.pastUnused)}
                  </option>
                  <option value={$type.singlePurchase}>
                    {localizeType($type.singlePurchase)}
                  </option>
                  <option value={$type.subscriptionBundle}>
                    {localizeType($type.subscriptionBundle)}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input
            type="radio"
            name="willExpire"
            checked={willExpire}
            onChange={e => setWillExpire(true)}
          />
          <span>期限あり　</span>
          <input
            type="radio"
            name="willExpire"
            checked={!willExpire}
            onChange={e => setWillExpire(false)}
          />
          <span>期限なし　</span>
        </div>
        <br />
        <p
          className="subtitle"
          style={{ border: "1px dashed whitesmoke", padding: "0.5rem" }}
        >
          {month ? moment(month).format("M月　") : ""}
          {type ? localizeType(type) : "　"}{" "}
          {type && (willExpire ? "期限あり" : "期限なし")}
        </p>
        <p>{month && type ? "１枚発券します。よろしいですか？" : "　"}</p>

        <div className="fr">
          <button onClick={close}>キャンセル</button>
          <button disabled={!month || !type} onClick={add}>
            発券する
          </button>
        </div>
      </Modal>
    </div>
  );
};

const SingleTicketVendor = () => {
  const thisMonth = moment("2020-08-31").format("YYYY-MM");
  const nextMonth = moment("2020-08-31").add(1, "month").format("YYYY-MM");
  const [month, setMonth] = useState(thisMonth);

  return (
    <div className="SingleTicketVendor">
      <h3>自動券売機（補講の追加）</h3>
      <label>利用する月：</label>
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value={thisMonth}>{thisMonth}</option>
        <option value={nextMonth}>{nextMonth}</option>
      </select>
      <span>{moment(month).format("M月利用　きっぷ１枚")}</span>
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

  const diffInDays = moment(iso8601).diff(moment("2020-08-31"), "days");

  console.log(diffInDays);

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
