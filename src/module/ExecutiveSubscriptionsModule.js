import React from "react";
import { useSelector } from "react-redux";
import {
  selectSubscriptions,
  selectStudents,
  selectTickets,
} from "../redux/selector";
import moment from "moment";
import { localizePlan } from "./StudentSubscriptionModule";
import useFindLatestMembership from "../hook/useFindLatestMembership";
import { localizeStatus } from "../toolkit/localize";
import "../style/_executiveSubscriptionsModule.scss";
import { Link } from "react-router-dom";
import { student$subscription } from "../page/StudentPage";
import { $type } from "../template/ticket";

const nowIso8601 = moment().date(1).format("YYYY-MM-DD");
const nextIso8601 = moment().add(1, "month").date(1).format("YYYY-MM-DD");

const ExecutiveSubscriptionsModule = () => {
  const findLatestMembership = useFindLatestMembership();

  const tickets = useSelector(selectTickets);
  const students = useSelector(selectStudents);
  const subscriptions = useSelector(selectSubscriptions);
  const thisMonths = subscriptions?.filter(S => S.iso8601 === nowIso8601);
  const nextMonths = subscriptions?.filter(S => S.iso8601 === nextIso8601);
  const purchasedThisMonth = tickets?.filter(
    T => T.iso8601 === nowIso8601 && T.type === $type.singlePurchase
  );
  const purchasedNextMonth = tickets?.filter(
    T => T.iso8601 === nextIso8601 && T.type === $type.singlePurchase
  );

  const tableRows = students?.map(St => {
    const thisMonthsPlan = thisMonths?.find(S => S.uid === St.id)?.plan;
    const nextMonthsPlan = nextMonths?.find(S => S.uid === St.id)?.plan;
    const thisMonthsPurchase = purchasedThisMonth?.filter(T => T.uid === St.id);
    const nextMonthsPurchase = purchasedNextMonth?.filter(T => T.uid === St.id);
    const latestStatus = findLatestMembership(St.id)?.status;
    const hasPlanChange =
      nextMonthsPlan !== undefined && thisMonthsPlan !== nextMonthsPlan;
    const indicator = { border: "3px solid orange" };
    return (
      <tr key={St.id}>
        <td>
          <Link to={student$subscription + St.id}>
            {St.lastName_kanji} {St.firstName_kanji}
          </Link>
        </td>
        <td className={latestStatus}>
          {localizeStatus(latestStatus, "short")}
        </td>
        <td
          className={thisMonthsPlan ? "" : "no-data"}
          style={hasPlanChange ? indicator : {}}
        >
          {localizePlan(thisMonthsPlan)}
        </td>
        <td style={thisMonthsPurchase?.length ? indicator : {}}>
          {thisMonthsPurchase?.length}
        </td>
        <td
          className={nextMonthsPlan ? "" : "no-data"}
          style={hasPlanChange ? indicator : {}}
        >
          {localizePlan(nextMonthsPlan)}
        </td>
        <td style={nextMonthsPurchase?.length ? indicator : {}}>
          {nextMonthsPurchase?.length}
        </td>
      </tr>
    );
  });

  return (
    <div className="ExecutiveSubscriptionsModule">
      <table className="subscription-table">
        <thead>
          <tr>
            <th>生徒</th>
            <th>ステータス</th>
            <th>{moment().month() + 1}月</th>
            <th>補講</th>
            <th>{moment().add(1, "month").month() + 1}月</th>
            <th>補講</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ExecutiveSubscriptionsModule;
