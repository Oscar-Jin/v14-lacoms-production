import React from "react";
import moment from "moment";
import { useState } from "react";
import "../style/_executiveTimetableModule.scss";
import { useSelector } from "react-redux";
import { selectTimetables, findTimetable } from "../redux/selector";
import ScheduleTable from "../table/ScheduleTable";
import EditScheduleModal from "../modal/EditScheduleModal";
import { cloudCreate, cloudUpdate } from "../firebase/firestore";
import { createLessonWith } from "../template/lesson";
import LoadingModal from "../modal/LoadingModal";

const clone = require("rfdc")();

// ──────────────────────────────────────────────────────────── オプション ───┐
export const $daysOfWeek = {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
};

export const $timeString = {
  s09_00: "09:00",
  s10_30: "10:30",
  s11_00: "11:00",
  s13_00: "13:00",
  s15_00: "15:00",
  s17_00: "17:00",
  s17_30: "17:30",
  s19_00: "19:00",
  s19_30: "19:30",
};

export const $mode = {
  add: "add",
  edit: "edit",
};
// ────────────────────────────────────────────────────────────────────────┘

const ExecutiveTimetableModule = () => {
  const timetables = useSelector(selectTimetables);

  return (
    <div className="ExecutiveTimetableModule">
      {timetables.map(timetable => (
        <div key={timetable.id}>
          <Timetable id={timetable.id} />
        </div>
      ))}
    </div>
  );
};

export default ExecutiveTimetableModule;

// ───────────────────────────────────────────────────────────── ヘルパー ───┐

const Timetable = props => {
  const { id } = props;

  const [modalPayload, setModalPayload] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  const timetable = useSelector(state => findTimetable(state, id));
  const weeks = Object.keys($daysOfWeek);

  const { isGenerated } = timetable;

  // ============================= very important code here
  const handleGenerateLessons = () => {
    if (
      window.confirm(
        "時間割を確定します。確定後は編集できません。本当によろしいですか？"
      )
    ) {
      setShowLoading(true);

      const timetableClone = clone(timetable);
      const {
        iso8601,
        excludes,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      } = timetableClone;

      const month = moment(iso8601);

      const mondays = [];
      const tuesdays = [];
      const wednesdays = [];
      const thursdays = [];
      const fridays = [];
      const saturdays = [];
      const sundays = [];

      for (let i = 1; i <= month.daysInMonth(); i++) {
        if (excludes.find(the => the.date === i)) {
          continue;
        }

        switch (month.date(i).day()) {
          case 0: // sunday
            sundays.push(i);
            break;
          case 1: // monday
            mondays.push(i);
            break;
          case 2: // tuesday
            tuesdays.push(i);
            break;
          case 3: // wednesday
            wednesdays.push(i);
            break;
          case 4: // thursday
            thursdays.push(i);
            break;
          case 5: // friday
            fridays.push(i);
            break;
          case 6: // saturday
            saturdays.push(i);
            break;
          default:
            throw new Error("undefined day of week");
        }
      }

      const lessonsOnMonday = mondays
        .map(date => {
          return monday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonOnTuesday = tuesdays
        .map(date => {
          return tuesday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonOnWednesday = wednesdays
        .map(date => {
          return wednesday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonsOnThursday = thursdays
        .map(date => {
          return thursday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonsOnFriday = fridays
        .map(date => {
          return friday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonOnSatuday = saturdays
        .map(date => {
          return saturday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      const lessonOnSunday = sundays
        .map(date => {
          return sunday.map(schedule =>
            createLessonWith({
              iso8601: month.date(date).format("YYYY-MM-DD"),
              timeString: schedule.timeString,
              lessonName: schedule.lessonName,
              instructorName: schedule.instructorName,
              capacity: schedule.capacity,
            })
          );
        })
        .flat();

      lessonsOnMonday.forEach(lesson => {
        cloudCreate(lesson);
      });

      setTimeout(() => {
        lessonOnTuesday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 1000);

      setTimeout(() => {
        lessonOnWednesday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 2000);

      setTimeout(() => {
        lessonsOnThursday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 3000);

      setTimeout(() => {
        lessonsOnFriday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 4000);

      setTimeout(() => {
        lessonOnSatuday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 5000);

      setTimeout(() => {
        lessonOnSunday.forEach(lesson => {
          cloudCreate(lesson);
        });
      }, 6000);

      setTimeout(() => {
        timetableClone.isGenerated = true;
        cloudUpdate(timetableClone);
        setShowLoading(false);
      }, 7000);
    }
  };

  return (
    <div className="Timetable">
      <h3>
        {timetable.month}月時間割　{isGenerated ? "確定" : "確定前"}
      </h3>

      <div>
        {weeks.map(dayOfWeek => {
          return (
            <ScheduleTable
              key={dayOfWeek}
              timetable={timetable}
              dayOfWeek={dayOfWeek}
              modalPayload={modalPayload}
              setModalPayload={setModalPayload}
            />
          );
        })}
      </div>

      <hr />
      <button
        disabled={isGenerated}
        onClick={handleGenerateLessons}
        className="
      fr"
      >
        {isGenerated ? "確定済" : "確定する"}
      </button>
      <EditScheduleModal
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
        timetable={timetable}
      />
      <LoadingModal showLoading={showLoading} setShowLoading={setShowLoading} />
      <br />
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────── ローカライザー ───┐
export const localizeWeek = week => {
  switch (week) {
    case $daysOfWeek.monday:
      return "月曜日";
    case $daysOfWeek.tuesday:
      return "火曜日";
    case $daysOfWeek.wednesday:
      return "水曜日";
    case $daysOfWeek.thursday:
      return "木曜日";
    case $daysOfWeek.friday:
      return "金曜日";
    case $daysOfWeek.saturday:
      return "土曜日";
    case $daysOfWeek.sunday:
      return "日曜日";
    default:
      throw new Error("undefined days of week");
  }
};
// ────────────────────────────────────────────────────────────────────────┘
