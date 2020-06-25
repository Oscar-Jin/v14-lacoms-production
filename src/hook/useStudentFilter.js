import { useSelector } from "react-redux";
import {
  selectStudents,
  selectStudentFilter,
  selectMembershipsFilter,
  selectMemberships,
} from "../redux/selector";

import last from "lodash/last";

const useStudentFilter = () => {
  const students = useSelector(selectStudents);
  const allMemberships = useSelector(selectMemberships);

  const filter = useSelector(selectStudentFilter);
  const membersipFilter = useSelector(selectMembershipsFilter);

  const filteredStudents = students.filter(
    student =>
      student.lastName_hiragana >= filter.a &&
      student.lastName_hiragana < filter.b
  );

  if (membersipFilter === "all") {
    return filteredStudents;
  } else {
    const membershipFiltered = filteredStudents.filter(student => {
      const memberships =
        allMemberships.filter(membership => membership.uid === student.uid) ||
        [];
      const latest = last(memberships) || {};
      return latest.status === membersipFilter;
    });

    return membershipFiltered;
  }
};

export default useStudentFilter;
