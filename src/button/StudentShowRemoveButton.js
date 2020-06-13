import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStudentRemove } from "../redux/action";
import { selectShowStudentRemove } from "../redux/selector";

const ButtonShowRemoveStudent = () => {
  const dispatch = useDispatch();
  const showRemove = useSelector(selectShowStudentRemove);

  const show = () => {
    dispatch(showStudentRemove(!showRemove));
  };

  return (
    <button className="ButtonShowRemoveStudent" onClick={show}>
      {showRemove ? "キャンセル" : "全て表示"}
    </button>
  );
};

export default ButtonShowRemoveStudent;
