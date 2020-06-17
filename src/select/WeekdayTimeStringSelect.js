import React from "react";
import { $timeString as time } from "../module/ExecutiveTimetableModule";

const WeekdayTimeStringSelect = props => {
  const { value, onChange } = checkprops(props);

  return (
    <select
      className="WeekdayTimeStringSelect"
      id="weekday-time-select"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled></option>
      <option value={time.s10_30}>{time.s10_30}</option>
      <option value={time.s13_00}>{time.s13_00}</option>
      <option value={time.s15_00}>{time.s15_00}</option>
      <option value={time.s17_30}>{time.s17_30}</option>
      <option value={time.s19_30}>{time.s19_30}</option>
    </select>
  );
};

export default WeekdayTimeStringSelect;

// ────────────────────────────────────────────────────────────── check ───┐
const checkprops = props => {
  const { value, onChange } = props;

  if (props === undefined || props === undefined) {
    throw new Error("props are not provided");
  } else {
    return { value, onChange };
  }
};
// ────────────────────────────────────────────────────────────────────────┘
