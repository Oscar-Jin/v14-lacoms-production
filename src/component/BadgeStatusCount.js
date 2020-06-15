import React from "react";
import { useSelector } from "react-redux";
import { selectMemberships, selectStudents } from "../redux/selector";
import { $status } from "../template/membership";

const BadgeStatusCount = () => {
  const students = useSelector(selectStudents);
  const memberships = useSelector(selectMemberships);

  const { activeCount, pausedCount, cancelledCount } = generateStatusCounts(
    students,
    memberships
  );

  return (
    <div className="BadgeStatusCount">
      <span>
        LACOMS (会員{activeCount}　休会{pausedCount}　退会{cancelledCount})
      </span>
    </div>
  );
};

export default BadgeStatusCount;

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
