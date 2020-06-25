import React from "react";

const CapacitySelect = props => {
  const { value, onChange } = checkprops(props);
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <select
      className="CapacitySelect"
      id="capacity-select"
      value={value}
      onChange={onChange}
    >
      {options.map(value => (
        <option key={value} value={value}>
          {localzieCapacity(value)}
        </option>
      ))}
      <option value={999}>{localzieCapacity(999)}</option>
    </select>
  );
};

export default CapacitySelect;

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

export const localzieCapacity = capacity => {
  if (capacity === 999) {
    return "制限なし";
  } else {
    return capacity + "名まで";
  }
};
