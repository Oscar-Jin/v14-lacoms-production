import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import last from "lodash/last";
import { filterMemberships } from "../redux/selector";
import { $status } from "../template/membership";
import { cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const ButtonActivateMembership = () => {
  const { id } = useParams();
  const memberships = useSelector(state => filterMemberships(state, id));
  const latest = last(memberships) || {};
  const { iso8601, status } = latest;

  const isSameMonth =
    moment("2020-08-15").format("YYYY-MM") ===
    moment(iso8601).format("YYYY-MM");

  const activate = () => {
    if (isSameMonth) {
      const editedLatest = clone(latest);
      editedLatest.status = $status.active;

      cloudUpdate(editedLatest);
    }
  };

  return (
    <button
      className="ButtonActivateMembership"
      disabled={!isSameMonth || !status || status === $status.active}
      onClick={activate}
    >
      Activate（再開）
    </button>
  );
};

export default ButtonActivateMembership;
