import React from "react";
import moment from "moment";
import "../style/_lessonPage.scss";
import { useSelector } from "react-redux";
import { selectLessons, selectReservations } from "../redux/selector";
import {
  sortLessons,
  reservationPackage,
  checkLessonType,
  checkWhichWeekend,
} from "./SchedulePage";
import { useState } from "react";
import EditStudentAttendanceModal from "../modal/EditStudentAttendanceModal";
import { $state } from "../module/StudentReservationModule";
import EditSmallTalkModal from "../modal/EditSmallTalkModal";

const LessonPage = props => {
  const lessons = useSelector(selectLessons);
  const reservations = useSelector(selectReservations);
  const todaysLessons = filterTodaysLessons(lessons);

  const [modalPayload, setModalPayload] = useState({});
  const [hideButton, setHidebutton] = useState(true);

  const handleClick = event => {
    setModalPayload({
      showAttendance: true,
      id: event.target.dataset.reservationid,
      uid: event.target.dataset.uid,
    });
    setHidebutton(true);
  };

  const handleSmallTalk = event => {
    setModalPayload({
      showSmallTalk: true,
      id: event.target.dataset.id,
    });
    setHidebutton(true);
  };

  const timeStrings = ["XX:XX"];
  const schedules = todaysLessons.map((lesson, index) => {
    const { timeString, lessonName, instructorName, id, smallTalk } = lesson;
    const { filtered, count } = reservationPackage(reservations, id);
    const isSame = timeString === timeStrings[index];
    timeStrings.push(timeString);

    let hasBlank = false;
    filtered.forEach(resv => {
      if (!allCheckComplete(resv)) {
        hasBlank = true;
      }
    });

    return (
      <tr key={id}>
        <td className="td-timeString">{isSame ? "" : timeString}</td>
        <td className={"td-lessonName " + checkLessonType(lessonName)}>
          {lessonName}
        </td>
        <td className="td-instructorName">{instructorName}</td>
        <td className="td-reservation-count">生徒{count}名</td>
        <td className="td-reservation-name">
          {studentInfo(filtered, handleClick, hideButton)}
        </td>
        <td>
          <span
            style={{
              fontSize: "0.85rem",
              backgroundColor: "dodgerblue",
              color: "white",
            }}
          >
            {smallTalk}
          </span>
        </td>
        <td>
          {hasBlank ? (
            <span style={{ fontSize: "0.9rem", color: "whitesmoke" }}>
              Not complete
            </span>
          ) : (
            <button data-id={id} onClick={handleSmallTalk}>
              Small talk
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="LessonPage">
      <div className="ScheduleSection">
        <h2>本日の予定</h2>
        <button className="fr" onClick={() => setHidebutton(!hideButton)}>
          {hideButton ? "Enable" : "Disable"}
        </button>
        <h3 className={checkWhichWeekend(moment())}>
          {moment().format("YYYY-MM-DD dddd")}
        </h3>
        <table className="ScheduleTable">
          <tbody>{schedules}</tbody>
        </table>
      </div>
      <p>
        ＊現時点で、当日キャンセルした生徒はこちらに表示されませんのでご注意ください。（内部ステート問題により）
      </p>
      <p>
        ＊現時点で、Pole
        Starは必要最低限の機能しか搭載されておりません。予定変更問題により、内部の大幅改修工事を行う必要があるためです。皆様に大変ご不便をおかけしますが、次回のアップデートまで今しばらくお待ちください。
      </p>
      <br />
      <br />
      <EditStudentAttendanceModal
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
      ></EditStudentAttendanceModal>
      <EditSmallTalkModal
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
      ></EditSmallTalkModal>
    </div>
  );
};

export default LessonPage;

// ──────────────────────────────────────────────────────────────────── ───┐
// ────────────────────────────────────────────────────────────────────────┘

const filterTodaysLessons = lessons => {
  const todaysLessons = lessons.filter(
    lesson => lesson.iso8601 === moment().format("YYYY-MM-DD")
  );
  const sorted = sortLessons(todaysLessons);

  return sorted;
};

const studentInfo = (filtered, handleClick, hideButton) => {
  return filtered.map(reservation => {
    const {
      lastName_kanji,
      firstName_kanji,
      isFirstLesson,
      isNewStudent,
      isRegulars,
      uid,
      id,
    } = reservation;
    return (
      <div
        style={{ marginRight: "1rem", display: "inline-block" }}
        key={id}
        className={
          isFirstLesson
            ? "first-lesson"
            : isNewStudent
            ? "new-student"
            : isRegulars
            ? "regular-student"
            : "nonregular-student"
        }
      >
        <div className={indicator(reservation, hideButton)}>
          <div className="the-border">
            <button
              data-uid={uid}
              data-reservationid={id}
              onClick={handleClick}
              disabled={allCheckComplete(reservation) && hideButton}
            >
              {lastName_kanji} {firstName_kanji}
            </button>
          </div>
          {/* <div className="status-bar">課題</div> */}
        </div>
      </div>
    );
  });
};

const allCheckComplete = reservation => {
  const { state, assignmentCheck, comtanCheck } = reservation;
  let complete = false;

  if (state === $state.attended || state === $state.noShow) {
    if (assignmentCheck !== "" && assignmentCheck !== undefined) {
      if (comtanCheck === "◯" || comtanCheck === "△" || comtanCheck === "ー") {
        complete = true;
      }
    }
  }

  return complete;
};

const indicator = (reservation, hideButton) => {
  if (allCheckComplete(reservation) && hideButton) {
    return "all-check-complete";
  } else if (allCheckComplete(reservation) && !hideButton) {
    return "";
  }

  return "";
};
