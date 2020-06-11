import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddStudentModal } from "../redux/action";
import { selectShowStudentRemove } from "../redux/selector";

const ilblock = { display: "inline-block" };

const ButtonAddStudent = () => {
  const dispatch = useDispatch();
  const showRemoveButton = useSelector(selectShowStudentRemove);

  const modal = () => {
    dispatch(showAddStudentModal(true));
  };

  return (
    <button
      style={ilblock}
      onClick={modal}
      disabled={showRemoveButton}
      className="ButtonAddStudent"
    >
      + Add 生徒追加
    </button>
  );
};

export default ButtonAddStudent;
