import React from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import { selectLessons } from "../redux/selector";
import { tr } from "date-fns/locale";
import { localzieCapacity } from "../select/CapacitySelect";
import { localizeRegularsOnly } from "../table/ScheduleTable";
import "../style/_schedulePage.scss";
import { $lessonName } from "../template/lesson";

const SchedulePage = () => {
  const month = 7; // <-- override point
  const lessons = useSelector(selectLessons);
  const datesArray = createDateArray(lessons, month);

  let timeStrings = ["XX:XX"];
  return (
    <div className="SchedulePage">
      <button disabled>7月</button>
      <button disabled>8月</button>
      <button disabled>9月</button>

      {datesArray.map(date => {
        const filtered = lessons.filter(lesson => lesson.iso8601 === date);
        sortLessons(filtered);
        return (
          <div key={date} className="ScheduleSection">
            <h3 className={checkWhichWeekend(date)}>
              {date}　（{moment(date).format("dddd")}）
            </h3>
            <table className="ScheduleTable">
              <tbody>
                {filtered.map((lesson, i) => {
                  const {
                    timeString,
                    lessonName,
                    instructorName,
                    capacity,
                    regularsOnly,
                    reservedBy,
                  } = lesson;
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
                      <td className="td-capacity">
                        {localzieCapacity(capacity)}
                      </td>
                      <td className="td-regularsOnly">
                        {localizeRegularsOnly(regularsOnly)}
                      </td>
                      <td className="td-seatsAvailable">
                        {reservedBy.length < capacity ? "空席あり" : "満席"}
                      </td>
                      <td className="td-reservedBy-count">
                        {reservedBy.length}名予約
                      </td>
                      <td className="td-reservedBy-name">
                        {reservedBy.length
                          ? reservedBy.map(entry => entry.name)
                          : ""}
                      </td>
                      <td>
                        <button disabled>編集</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="fr" disabled>
              追加
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SchedulePage;

// ────────────────────────────────────────────────────────────── tools ───┐

export const createDateArray = (lessons, month) => {
  if (lessons === undefined || month === undefined) {
    throw new Error("all props must be provided");
  }
  const datesObject = {};

  lessons.forEach((lesson, index) => {
    if (lesson.month === month) {
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
    case $lessonName.ONLINE_E:
    case $lessonName.ONLINE_F:
    case $lessonName.ONLINE_GHI:
      return "GV";
    case $lessonName.L1:
    case $lessonName.L2:
    case $lessonName.L3:
    case $lessonName.L4:
    case $lessonName.L5:
      return "LSP";
    default:
      return "";
  }
};

// ────────────────────────────────────────────────────────────────────────┘
