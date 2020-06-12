import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findStudent } from "../redux/selector";

const useCheckoutStudent = () => {
  const { id } = useParams();
  const student = useSelector(state => findStudent(state, id));
  const dispatch = useDispatch();

  return [student, dispatch];
};

export default useCheckoutStudent;
