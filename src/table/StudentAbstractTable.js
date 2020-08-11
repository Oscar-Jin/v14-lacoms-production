import React from "react";
import moment from "moment";

import useStudentFilter from "../hook/useStudentFilter";
import { Link } from "react-router-dom";
import { localizeSex, localizeStatus } from "../toolkit/localize";
import ButtonRemoveStudent from "../button/StudentRemoveButton";
import { student$info } from "../page/StudentPage";
import useFindLatestMembership from "../hook/useFindLatestMembership";
import "../style/_tableStudentAbstracts.scss";
import { useSelector } from "react-redux";
import {
  selectShowStudentRemove,
  selectMembershipsFilter,
} from "../redux/selector";
import BadgeRemainingTickets from "../component/BadgeRemainingTickets";

const TableStudentAbstracts = () => {
  const students = useStudentFilter();
  const membershipFilter = useSelector(selectMembershipsFilter);
  const shouldShowRemove = useSelector(selectShowStudentRemove);
  const findLatestMembership = useFindLatestMembership();

  const abstracts = students.map(student => {
    const {
      lastName_hiragana,
      firstName_hiragana,
      lastName_kanji,
      firstName_kanji,
      sex,
      birthdate,
      id,
    } = student;
    return (
      <tr key={id}>
        <td>
          {lastName_hiragana} {firstName_hiragana}
        </td>
        <td>
          <Link to={student$info + id}>
            {lastName_kanji} {firstName_kanji}
          </Link>
        </td>
        <td>{localizeSex(sex, "short")}</td>
        <td>{simplifyAge(birthdate)}</td>
        <td className={findLatestMembership(id).status}>
          {localizeStatus(findLatestMembership(id).status, "short")}
        </td>
        <td>
          <BadgeRemainingTickets
            id={id}
            targetIso8601={moment().date(1).format("YYYY-MM-DD")}
          />
        </td>
        <td style={{ borderLeft: "1px solid gray" }}>
          <BadgeRemainingTickets
            id={id}
            targetIso8601={moment()
              .add(1, "month")
              .date(1)
              .format("YYYY-MM-DD")}
          />
        </td>
        <td>
          <ButtonRemoveStudent id={id} />
        </td>
      </tr>
    );
  });

  return (
    <div className={"TableStudentAbstracts "}>
      <table className={"bd-" + membershipFilter}>
        <thead>
          <tr>
            <th>ひらがな</th>
            <th>漢字</th>
            <th>性別</th>
            <th>年齢区分</th>
            <th>ステータス</th>
            <th>{moment().month() + 1}月利用可能なチケット</th>
            <th>{moment().add(1, "month").month() + 1}月利用可能なチケット</th>
            <th>{shouldShowRemove ? "削除" : ""}</th>
          </tr>
        </thead>
        <tbody>{abstracts}</tbody>
      </table>
    </div>
  );
};

export default TableStudentAbstracts;

const simplifyAge = birthdate => {
  if (!birthdate) {
    return "";
  }

  const age = moment().diff(moment(birthdate), "years");

  if (age < 7) {
    return "幼児";
  } else if (age < 13) {
    return "学童";
  } else if (age < 20) {
    return "10代";
  } else if (age < 30) {
    return "20代";
  } else if (age < 40) {
    return "30代";
  } else if (age < 50) {
    return "40代";
  } else if (age < 60) {
    return "50代";
  } else if (age < 70) {
    return "60代";
  } else if (age < 80) {
    return "70代";
  } else {
    return "80代~";
  }
};
