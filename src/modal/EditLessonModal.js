import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { style } from "./AddStudentModal";
import { useSelector } from "react-redux";
import { findLesson, selectReservations } from "../redux/selector";
import { cloudDelete, cloudUpdate } from "../firebase/firestore";
import { reservationPackage } from "../page/SchedulePage";
import { useEffect } from "react";
import { useState } from "react";
import LessonsNameSelect from "../select/LessonsNameSelect";
import InstructorNameSelect from "../select/InstructorNameSelect";
import CapacitySelect from "../select/CapacitySelect";
import RegularsOnlySelect from "../select/RegularsOnlySelect";

const clone = require("rfdc")();

const EditLessonModal = props => {
  const { payload, setPayload } = props;
  const { showEditLessonModal, lessonID } = payload || {};
  if (payload === undefined || setPayload === undefined) {
    throw new Error("props must be all provided");
  }
  const reservations = useSelector(selectReservations);
  const lesson = useSelector(state => findLesson(state, lessonID));
  const { iso8601, timeString, id } = lesson;
  const { count } = reservationPackage(reservations, lesson.id);

  const [lessonName, setLessonName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [capacity, setCapacity] = useState(999); // 無制限
  const [regularsOnly, setRegularsOnly] = useState(false);

  useEffect(() => {
    setLessonName(id ? lesson.lessonName : "");
    setInstructorName(id ? lesson.instructorName : "");
    setCapacity(id ? lesson.capacity : 999);
    setRegularsOnly(id ? lesson.regularsOnly || false : false);
  }, [lesson, id]);

  console.log(lessonName, instructorName, capacity, regularsOnly);

  const handleDelete = () => {
    if (count > 0) {
      throw new Error("Class is alreay reserved by student");
    } else {
      if (window.confirm(`本当に${lessonName}クラスを削除しますか？`)) {
        cloudDelete(lesson);
        handleClose();
      }
    }
  };

  const handleChange = () => {
    const lessonClone = clone(lesson);
    lessonClone.lessonName = lessonName;
    lessonClone.instructorName = instructorName;
    lessonClone.capacity = capacity;
    lessonClone.regularsOnly = regularsOnly;

    cloudUpdate(lessonClone);
    handleClose();
  };

  const handleClose = () => {
    setLessonName("");
    setInstructorName("");
    setCapacity(999);
    setRegularsOnly(false);
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
        <p>危険な操作です。管理者以外は使用しないでください。</p>
        <hr />
        <span style={{ color: "darkgray" }}>LessonID:</span>
        <span
          style={{
            display: "block",

            fontSize: "1.2rem",
            color: "darkgray",
            fontWeight: "bold",
          }}
        >
          {id}
        </span>
        <div>
          <h4>
            {iso8601} {moment(iso8601).format("dddd")} | {timeString}
          </h4>
        </div>
        <div>
          <LessonsNameSelect
            value={lessonName}
            onChange={e => setLessonName(e.target.value)}
          />
        </div>
        <div>
          <InstructorNameSelect
            value={instructorName}
            onChange={e => setInstructorName(e.target.value)}
          />
        </div>
        <div>
          <CapacitySelect
            value={capacity}
            onChange={e => setCapacity(parseInt(e.target.value))}
          />
        </div>
        <div>
          <RegularsOnlySelect
            value={regularsOnly}
            onChange={e => {
              setRegularsOnly(e.target.value === "true" ? true : false);
              console.log(regularsOnly);
            }}
          />
        </div>
        <p className="subtitle">
          既に予約されている状態でクラスの変更を行った場合、
          <br /> 元のクラスで予約している生徒も新しいクラスに変更されます。
        </p>
        <p className="subtitle">
          クラスを削除する場合、まずは「０名まで」に設定してください。
        </p>
        <br />
        <button onClick={handleDelete} disabled={count > 0}>
          {count > 0 ? "既に予約があります" : "削除する"}
        </button>
        <div className="fr">
          <button onClick={handleClose}>キャンセル</button>
          <button onClick={handleChange}>変更する</button>
        </div>
      </Modal>
    </div>
  );
};

export default EditLessonModal;
