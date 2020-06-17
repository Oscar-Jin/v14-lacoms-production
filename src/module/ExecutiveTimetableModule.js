import React from "react";
import { useState } from "react";
import "../style/_executiveTimetableModule.scss";
import { useSelector } from "react-redux";
import { selectTimetables, findTimetable } from "../redux/selector";
import ScheduleTable from "../table/ScheduleTable";
import EditScheduleModal from "../modal/EditScheduleModal";

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

  const timetable = useSelector(state => findTimetable(state, id));
  const weeks = Object.keys($daysOfWeek);

  const { isGenerated } = timetable;

  const handleGenerateLessons = () => {
    window.confirm(
      "まだ確定できません。必要なモジュールが搭載されていません \n Module Required: <HandleGenerateLessons /> #ac02f31"
    );
    // window.confirm(
    //   "本当に確定しますか？確定したら、再度時間割を編集することはできません。"
    // );
    // setIsGenerated(true);
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
