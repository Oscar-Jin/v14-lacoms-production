import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { style } from "./AddStudentModal";
import { useSelector } from "react-redux";
import { findLesson } from "../redux/selector";
import { cloudDelete, cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const EditLessonModal = props => {
  const { payload, setPayload } = props;
  const { showEditLessonModal, lessonID } = payload || {};
  if (payload === undefined || setPayload === undefined) {
    throw new Error("props must be all provided");
  }
  const lesson = useSelector(state => findLesson(state, lessonID));
  const {
    iso8601,
    timeString,
    lessonName,
    instructorName,
    capacity,
    reservedBy = [],
    id,
  } = lesson;

  const handleDelete = () => {
    if (reservedBy.length > 0) {
      throw new Error("Class is alreay reserved by student");
    } else {
      if (window.confirm(`本当に${lessonName}クラスを削除しますか？`)) {
        cloudDelete(lesson);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setPayload({});
  };

  return (
    <div className="EditLessonModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={showEditLessonModal}
        style={style}
      >
        <h3 className="red">
          試験中　Experimental, consult Kinchan before use
        </h3>
        <p>非常に危険な操作です。使用しないでください。</p>
        <hr />
        <h4>
          {iso8601} {moment(iso8601).format("dddd")} {timeString} {lessonName}{" "}
          {instructorName}
        </h4>
        <button onClick={handleDelete} disabled={reservedBy.length > 0}>
          {reservedBy.length > 0 ? "既に予約があります" : "クラスを削除する"}
        </button>
        <br />
        <div className="fr">
          <button onClick={handleClose}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default EditLessonModal;
