import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { selectShowEditStudentModalBundle } from "../redux/selector";
import { TOGGLE_EDIT_STUDENT_MODAL } from "../redux/reducer";
import FormStudentInfoEdit from "../component/FormStudentInfoEdit";

const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const EditStudentInfoModal = () => {
  const { editStudentModal } = useSelector(selectShowEditStudentModalBundle);
  const dispatch = useDispatch();

  const close = () => {
    dispatch({
      type: TOGGLE_EDIT_STUDENT_MODAL,
      payload: {
        editStudentModal: false,
        referenceKey: null,
        noteReferenceKey: null,
      },
    });
  };

  return (
    <div className="EditStudentInfoModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={editStudentModal}
        style={style}
      >
        <FormStudentInfoEdit close={close} />
        <button onClick={close}>x</button>
      </Modal>
    </div>
  );
};

export default EditStudentInfoModal;
