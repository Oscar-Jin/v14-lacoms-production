import React from "react";
import { $instructorName } from "../template/lesson";

const InstructorNameSelect = props => {
  const { value, onChange } = checkprops(props);
  const instructorNames = Object.keys($instructorName);

  return (
    <select
      className="InstructorNameSelect"
      id="lesson-name-select"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled></option>
      {instructorNames.map(instructor => (
        <option key={instructor} value={instructor}>
          {instructor}
        </option>
      ))}
    </select>
  );
};

export default InstructorNameSelect;

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
