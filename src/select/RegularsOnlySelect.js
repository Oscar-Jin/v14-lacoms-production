import React from "react";
import { localizeRegularsOnly } from "../table/ScheduleTable";

const RegularsOnlySelect = props => {
  const { value, onChange } = checkprops(props);
  return (
    <select
      className="RegularsOnlySelect"
      id="regulars-select"
      value={value}
      onChange={onChange}
    >
      <option value="false">{localizeRegularsOnly(false)}</option>
      <option value="true">{localizeRegularsOnly(true)}</option>
    </select>
  );
};

export default RegularsOnlySelect;

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
