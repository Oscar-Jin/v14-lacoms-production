import React from "react";
import Modal from "react-modal";
import { style } from "./AddStudentModal";
import { useSelector } from "react-redux";
import { findReservation, selectLessons } from "../redux/selector";
import { useState } from "react";
import { cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const EditReservationModal = props => {
  const { modalPayload, setModalPayload } = props;
  const { showEditReservation, reservationID } = modalPayload;

  const lessons = useSelector(selectLessons);
  const reservation = useSelector(state =>
    findReservation(state, reservationID)
  );
  const { iso8601, timeString, lessonName, instructorName } = reservation;

  const [lessonID, setLessonID] = useState("");

  const handleChange = () => {
    const targetLesson = lessons.find(lesson => lesson.id === lessonID);
    const bot = document.getElementById("bot");
    bot.innerText = "";

    if (targetLesson) {
      const {
        lessonName,
        instructorName,
        year,
        month,
        date,
        hour,
        minute,
        iso8601,
        timeString,
      } = targetLesson;
      const reservationClone = clone(reservation);
      reservationClone.year = year;
      reservationClone.month = month;
      reservationClone.date = date;
      reservationClone.hour = hour;
      reservationClone.minute = minute;
      reservationClone.iso8601 = iso8601;
      reservationClone.timeString = timeString;
      reservationClone.lessonID = lessonID;
      reservationClone.lessonName = lessonName;
      reservationClone.instructorName = instructorName;

      cloudUpdate(reservationClone);
      handleClose();
    } else {
      bot.innerText = "入力に問題があります。正しいIDを入力してください。";
    }
  };

  const handleClose = () => {
    setLessonID("");
    setModalPayload({});
  };

  return (
    <div className="EditReservationModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={showEditReservation}
        style={style}
      >
        <h4>
          {iso8601} {timeString} {lessonName} {instructorName}
        </h4>
        <p>
          予約したクラスの変更を行います。
          <br />
          ターゲット先のLessonIDを入力してください。
        </p>
        <p className="subtitle red">
          クラスの変更は同じ日の中で行ってください。
          <br />
          他の日に移動する時は、まず削除して、新しく予定を追加してください。
        </p>
        <input
          type="text"
          value={lessonID}
          onChange={e => setLessonID(e.target.value)}
          placeholder="i4W5zr..."
        />
        <p id="bot"></p>
        <br />
        <div className="fr">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleChange} disabled={!lessonID}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditReservationModal;
