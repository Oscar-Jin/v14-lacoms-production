import React from "react";
import useStudentFilter from "../hook/useStudentFilter";
import { useSelector } from "react-redux";
import { selectMemberships } from "../redux/selector";
import { memberships } from "../redux/reducer";
import { $status } from "../template/membership";

const BadgeStudentCalcs = () => {
  const students = useStudentFilter();
  const memberships = useSelector(selectMemberships);

  const { activeCount, pausedCount, cancelledCount } = generateStatusCounts(
    students,
    memberships
  );

  return (
    <span className="BadgeStudentCalcs">
      計{students.length}名　　
      <span style={{ fontSize: "0.9rem" }}>
        (会員{activeCount}　休会{pausedCount}　退会{cancelledCount})
      </span>
    </span>
  );
};

export default BadgeStudentCalcs;

const generateStatusCounts = (students, memberships) => {
  let activeCount = null;
  let pausedCount = null;
  let cancelledCount = null;

  let statusArray = [];

  students.forEach(student => {
    const membership = memberships.find(
      membership => membership.uid === student.id
    );
    if (membership) {
      statusArray.push(membership.status);
    }
  });

  statusArray.forEach(status => {
    switch (status) {
      case $status.active:
        activeCount += 1;
        break;
      case $status.paused:
        pausedCount += 1;
        break;
      case $status.cancelled:
        cancelledCount += 1;
        break;
      default:
    }
  });

  return {
    activeCount,
    pausedCount,
    cancelledCount,
  };
};
