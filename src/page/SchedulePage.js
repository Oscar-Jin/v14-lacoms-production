import React, { useState } from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import { selectLessons, selectReservations } from "../redux/selector";
import { tr } from "date-fns/locale";
import { localzieCapacity } from "../select/CapacitySelect";
// import { localizeRegularsOnly } from "../table/ScheduleTable";
import "../style/_schedulePage.scss";
import { $lessonName } from "../template/lesson";
import { Link } from "react-router-dom";
import { student$info } from "./StudentPage";
import AddNewLessonModal from "../modal/AddNewLessonModal";
import EditLessonModal from "../modal/EditLessonModal";
import { $state } from "../module/StudentReservationModule";
import HeavensMemoDisplay from "../component/HeavensMemoDisplay";

const SchedulePage = () => {
  const [targetDate, setTargetDate] = useState(moment("2020-7-01"));

  const lessons = useSelector(selectLessons);
  const reservations = useSelector(selectReservations);
  const datesArray = createDateArray(lessons, targetDate);

  const [payload, setPayload] = useState({});

  const handleAdd = event => {
    setPayload({
      showAddLessonModal: true,
      iso8601: event.target.dataset.date,
    });
  };

  const handleEdit = event => {
    setPayload({
      showEditLessonModal: true,
      lessonID: event.target.dataset.lessonid,
    });
  };

  return (
    <div className="SchedulePage">
      <button
        disabled={moment("2020-08-31")
          .subtract(1, "month")
          .isSame(targetDate, "month")}
        onClick={() => setTargetDate(moment("2020-08-31").subtract(1, "month"))}
      >
        前月
      </button>
      <button
        disabled={moment("2020-08-31").isSame(targetDate, "month")}
        onClick={() => setTargetDate(moment("2020-08-31"))}
      >
        今月
      </button>
      <button
        disabled={moment("2020-08-31")
          .add(1, "month")
          .isSame(targetDate, "month")}
        onClick={() => setTargetDate(moment("2020-08-31").add(1, "month"))}
      >
        来月
      </button>

      {datesArray.map(date => {
        const filtered = lessons.filter(lesson => lesson.iso8601 === date);
        sortLessons(filtered);
        let timeStrings = ["XX:XX"];
        return (
          <div key={date} className="ScheduleSection">
            <h3 className={checkWhichWeekend(date)} style={{ marginBottom: 0 }}>
              {date}　（{moment(date).format("dddd")}）
            </h3>
            <HeavensMemoDisplay iso8601={date} />
            <table className="ScheduleTable">
              <tbody>
                {filtered.map((lesson, i) => {
                  const {
                    timeString,
                    lessonName,
                    instructorName,
                    smallTalk,
                    capacity,
                    regularsOnly,
                    id,
                  } = lesson;
                  const { filtered, count } = reservationPackage(
                    reservations,
                    id
                  );
                  const isSame = timeString === timeStrings[i];
                  timeStrings.push(timeString);

                  return (
                    <tr key={lesson.id}>
                      <td className="td-timeString">
                        {isSame ? "" : timeString}
                      </td>
                      <td
                        className={
                          "td-lessonName " + checkLessonType(lessonName)
                        }
                      >
                        {lessonName}
                      </td>
                      <td className="td-instructorName">{instructorName}</td>
                      <td className="td-smallTalk">{smallTalk}</td>
                      <td className="td-capacity">
                        {localzieCapacity(capacity)}
                      </td>
                      <td className="td-regularsOnly">
                        <span className="subtitle">
                          {regularsOnly && "レギュラーのみ"}
                        </span>
                      </td>
                      <td className="td-seatsAvailable">
                        {count < capacity ? (
                          <span>空席あり</span>
                        ) : (
                          <span className="red">満席</span>
                        )}
                      </td>
                      <td className="td-reservation-count">予約{count}名</td>
                      <td className="td-reservation-name">
                        {filtered.map(reservation => {
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
                            <span
                              style={{ marginRight: "1rem" }}
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
                              <Link to={student$info + uid}>
                                {lastName_kanji} {firstName_kanji}
                              </Link>
                            </span>
                          );
                        })}
                      </td>
                      <td>
                        <button data-lessonid={id} onClick={handleEdit}>
                          編集
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="fr" data-date={date} onClick={handleAdd}>
              追加
            </button>
          </div>
        );
      })}

      <AddNewLessonModal payload={payload} setPayload={setPayload} />
      <EditLessonModal payload={payload} setPayload={setPayload} />
    </div>
  );
};

export default SchedulePage;

// ────────────────────────────────────────────────────────────── tools ───┐

export const createDateArray = (lessons, targetDate) => {
  if (lessons === undefined || targetDate === undefined) {
    throw new Error("all props must be provided");
  }
  const datesObject = {};

  const year = moment(targetDate).year();
  const month = moment(targetDate).month() + 1;

  lessons.forEach((lesson, index) => {
    if (lesson.year === year && lesson.month === month) {
      datesObject["_" + lesson.iso8601] = lesson.iso8601;
    }
  });

  return Object.values(datesObject);
};

export const sortLessons = lessons => {
  lessons.sort((a, b) => {
    if (a.lessonName < b.lessonName) {
      return -1;
    }
    if (a.lessonName > b.lessonName) {
      return 1;
    }
    return 0;
  });
  lessons.sort((a, b) => {
    return a.hour - b.hour;
  });

  return lessons;
};

export const checkWhichWeekend = date => {
  switch (moment(date).day()) {
    case 0:
      return "sunday";
    case 6:
      return "saturday";
    default:
      return "weekday";
  }
};

export const checkLessonType = lessonName => {
  switch (lessonName) {
    case $lessonName.A:
    case $lessonName.B:
    case $lessonName.C:
    case $lessonName.D:
    case $lessonName.E:
    case $lessonName.F:
    case $lessonName.GHI:
    case $lessonName.ONLINE:
    case $lessonName.ONLINE_E:
    case $lessonName.ONLINE_F:
    case $lessonName.ONLINE_GHI:
      return "GV";
    case $lessonName.L1:
    case $lessonName.L2:
    case $lessonName.L3:
    case $lessonName.L4:
    case $lessonName.L5:
    case $lessonName.ONLINE_L1:
      return "LSP";
    default:
      return "";
  }
};

// const findReservedStudents = (reservations, id) => {
//   const filtered = reservations.filter(
//     RESERVATION => RESERVATION.lessonID === id
//   );

//   return (
//     <div>
//       {filtered.map(reservation => {
//         const { lastName_kanji, firstName_kanji, uid, id } = reservation;
//         return (
//           <span style={{ marginRight: "1rem" }} key={id}>
//             <Link to={student$info + uid}>
//               {lastName_kanji} {firstName_kanji}
//             </Link>
//           </span>
//         );
//       })}
//     </div>
//   );
// };

export const reservationPackage = (reservations, lessonID) => {
  const firstFilter = reservations.filter(
    RESERVATION => RESERVATION.lessonID === lessonID
  );

  const filtered = firstFilter.filter(RESERVATION => {
    switch (RESERVATION.state) {
      case $state.attended:
        return true;
      case $state.reserved:
        return true;
      case $state.noShow:
        return true;
      default:
        return false;
    }
  });

  return {
    filtered,
    count: filtered ? filtered.length : 0,
  };
};

// ────────────────────────────────────────────────────────────────────────┘
