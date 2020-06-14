import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { filterTickets } from "../redux/selector";
import { useParams } from "react-router-dom";
import { localizeType } from "../template/ticket";

const TableTickets = () => {
  const { id } = useParams();
  const tickets = useSelector(state => filterTickets(state, id));

  return (
    <div className="TableTickets">
      <p>乗車券一覧（みどりの窓口）</p>
      <table>
        <thead>
          <tr>
            <th>発行</th>
            <th>タイプ</th>
            <th>使用</th>
            <th>期限</th>
            <th>無効</th>
            <th>有効</th>
            <th>番号</th>
          </tr>
        </thead>
        <tbody>{createTableRows(tickets)}</tbody>
      </table>
    </div>
  );
};

export default TableTickets;

// ───────────────────────────────────────────────────────────── ヘルパー ───┐
const createMonthArray = tickets => {
  if (!tickets) {
    throw new Error("tickets must be provided");
  }

  if (tickets.length < 1) {
    return [];
  }

  let iso8601 = tickets[0].iso8601;
  let array = [iso8601];

  tickets.forEach(ticket => {
    if (ticket.iso8601 !== iso8601) {
      iso8601 = ticket.iso8601;
      array.push(iso8601);
    }
  });

  console.log(array);

  return array;
};

const createTableRows = tickets => {
  if (!tickets) {
    throw new Error("tickets must be provided");
  }

  const monthArray = createMonthArray(tickets);
  const tableRows = [];

  monthArray.forEach(iso8601 => {
    const group = tickets.filter(ticket => ticket.iso8601 === iso8601);
    const row = group.map(ticket => {
      const { iso8601, type, willExpire, expirationDate, usedOn, id } = ticket;
      return (
        <tr key={id}>
          <td>{moment(iso8601).format("YYYY-MM")}</td>
          <td>{localizeType(type)}</td>
          <td>{usedOn ? "使用済" : "未"}</td>
          <td>{willExpire ? "あり" : "なし"}</td>
          <td>{expirationDate}</td>
          <td>
            {expirationDate
              ? moment(expirationDate).diff(moment(), "day") + "日"
              : ""}
          </td>
          <td>{id}</td>
        </tr>
      );
    });
    row.push(
      <tr className="blank-row" key={iso8601}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
    tableRows.push(row);
  });

  return tableRows;
};

// ────────────────────────────────────────────────────────────────────────┘
