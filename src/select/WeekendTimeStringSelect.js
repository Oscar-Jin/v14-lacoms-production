import React from "react";
import { $timeString as $time } from "../module/ExecutiveTimetableModule";

const WeekendTimeStringSelect = props => {
  const { value, onChange } = checkprops(props);

  return (
    <select
      className="WeekendTimeStringSelect"
      id="weekend-time-select"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled></option>
      <option value={$time.s09_00}>{$time.s09_00}</option>
      <option value={$time.s11_00}>{$time.s11_00}</option>

      <option value={$time.s13_00}>{$time.s13_00}</option>
      <option value={$time.s15_00}>{$time.s15_00}</option>
      <option value={$time.s17_00}>{$time.s17_00}</option>
      <option value={$time.s19_00}>{$time.s19_00}</option>
    </select>
  );
};

export default WeekendTimeStringSelect;

// ───────────────────────────────────────────────────────────── check ───┐
const checkprops = props => {
  const { value, onChange } = props;

  if (props === undefined || props === undefined) {
    throw new Error("props are not provided");
  } else {
    return { value, onChange };
  }
};
// ────────────────────────────────────────────────────────────────────────┘
