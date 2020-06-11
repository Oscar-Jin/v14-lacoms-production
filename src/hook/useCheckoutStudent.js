import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findStudent } from "../redux/selector";

const useCheckoutStudent = () => {
  const { id } = useParams();
  const student = useSelector(state => findStudent(state, id));
  const history = useHistory();
  const dispatch = useDispatch();

  if (!student.id) {
    history.push("/");
    console.warn(`student ${id} does not exists. will redirect to '/'`);
  }

  return [student, dispatch];
};

export default useCheckoutStudent;
