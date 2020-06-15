import React from "react";
import { useSelector } from "react-redux";
import { selectStudents } from "../redux/selector";
import { $sex } from "../template/student";

const BadgeMaleFemaleRate = () => {
  const students = useSelector(selectStudents);

  let males = 0;
  let females = 0;
  let others = 0;

  students.forEach(student => {
    if (student.sex === $sex.male) {
      males += 1;
    } else if (student.sex === $sex.female) {
      females += 1;
    } else if (student.sex === $sex.other) {
      others += 1;
    }
  });

  return (
    <div className="BadgeMaleFemaleRate">
      <span>
        LACOMS (男性{males}　女性{females}　その他{others})
      </span>
    </div>
  );
};

export default BadgeMaleFemaleRate;
