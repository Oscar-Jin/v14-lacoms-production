import { useSelector } from "react-redux";
import { selectStudents, selectStudentFilter } from "../redux/selector";

const useStudentFilter = () => {
  const students = useSelector(selectStudents);
  const filter = useSelector(selectStudentFilter);

  const filteredStudents = students.filter(
    student =>
      student.lastName_hiragana >= filter.a &&
      student.lastName_hiragana < filter.b
  );

  return filteredStudents;
};

export default useStudentFilter;
