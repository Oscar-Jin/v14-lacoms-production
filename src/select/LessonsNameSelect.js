import React from "react";
import { $lessonName } from "../template/lesson";

const LessonsNameSelect = props => {
  const { value, onChange } = checkprops(props);
  const lessonNames = Object.keys($lessonName);

  return (
    <select
      className="LessonsNameSelect"
      id="lesson-name-select"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled></option>
      {lessonNames.map(lessonName => (
        <option key={lessonName} value={lessonName}>
          {lessonName}
        </option>
      ))}
    </select>
  );
};

export default LessonsNameSelect;

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
