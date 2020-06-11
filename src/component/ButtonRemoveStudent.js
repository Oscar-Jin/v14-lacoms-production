import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShowStudentRemove } from "../redux/selector";
import { extractIdFrom } from "../toolkit/extract";
import { showStudentRemove } from "../redux/action";
import { cloudDelete, deleteDocsMatchUid } from "../firebase/firestore";

const ButtonRemoveStudent = props => {
  const id = extractIdFrom(props);
  const shouldShow = useSelector(selectShowStudentRemove);
  const dispatch = useDispatch();

  const removeStudent = event => {
    window.confirm(
      "本当に生徒を削除しますか？この操作は生徒に関連する全ての情報をサーバーから抹消します。後戻しできません。You should not remove student from the server unless this is your last option. It is not recoverable once deleted.（開発中 can only remove student, won't able to remove other docs yet"
    ) && deleteDocsMatchUid(id);

    dispatch(showStudentRemove(false));
  };

  return (
    <span className="ButtonRemoveStudent">
      <button
        hidden={!shouldShow}
        onClick={removeStudent}
        style={{ color: "red" }}
      >
        x
      </button>
      <span hidden={!shouldShow} style={{ fontSize: "0.8rem", color: "red" }}>
        　この操作は危険です。生徒の削除は普段使用することありません。
      </span>
    </span>
  );
};

export default ButtonRemoveStudent;
