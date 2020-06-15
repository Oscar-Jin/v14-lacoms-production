import React from "react";
import useStudentFilter from "../hook/useStudentFilter";

const BadgeStudentCalcs = () => {
  const students = useStudentFilter();

  return <span className="BadgeStudentCalcs">計{students.length}名</span>;
};

export default BadgeStudentCalcs;
