import React from "react";
import { useDispatch } from "react-redux";
import { showAddStudentModal } from "../redux/action";

const block = { display: "inline-block" };

const ButtonAddStudent = () => {
  const dispatch = useDispatch();

  const modal = () => {
    dispatch(showAddStudentModal(true));
  };

  return (
    <button style={block} onClick={modal} className="ButtonAddStudent">
      Add Student 生徒追加
    </button>
  );
};

export default ButtonAddStudent;
