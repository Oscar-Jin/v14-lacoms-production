import React from "react";
import moment from "moment";
import last from "lodash/last";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterMemberships } from "../redux/selector";
import { $status } from "../template/membership";
import { cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const ButtonPauseMembership = () => {
  const { id } = useParams();
  const memberships = useSelector(state => filterMemberships(state, id));
  const { iso8601, status } = last(memberships) || {};

  const isSameMonth =
    moment().format("YYYY-MM") === moment(iso8601).format("YYYY-MM");

  const pause = () => {
    if (isSameMonth) {
      const latest = clone(last(memberships));

      latest.status = $status.paused;
      cloudUpdate(latest);
    }
  };

  return (
    <button
      className="ButtonPauseMembership"
      disabled={!isSameMonth || !status || status === $status.paused}
      onClick={pause}
    >
      Pause（休会）
    </button>
  );
};

export default ButtonPauseMembership;
