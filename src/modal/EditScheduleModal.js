import React from "react";
import moment from "moment";
import Modal from "react-modal";
import { useState } from "react";
import { style } from "../modal/AddStudentModal";
import { $daysOfWeek, localizeWeek } from "../module/ExecutiveTimetableModule";
import WeekdayTimeStringSelect from "../select/WeekdayTimeStringSelect";
import WeekendTimeStringSelect from "../select/WeekendTimeStringSelect";
import LessonsNameSelect from "../select/LessonsNameSelect";
import InstructorNameSelect from "../select/InstructorNameSelect";
import { useEffect } from "react";
import { cloudUpdate } from "../firebase/firestore";
import CapacitySelect from "../select/CapacitySelect";
import RegularsOnlySelect from "../select/RegularsOnlySelect";
import { createScheduleWith } from "../template/timetable";

const clone = require("rfdc")();

const EditScheduleModal = props => {
  const { modalPayload, setModalPayload, timetable } = props;
  const { dayOfWeek, id } = modalPayload;

  const [timeString, setTimeString] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [capacity, setCapacity] = useState(999); // 無制限
  const [regularsOnly, setRegularsOnly] = useState(false);

  useEffect(() => {
    setTimeString(
      id
        ? timetable[dayOfWeek].find(schedule => schedule.id === id).timeString
        : ""
    );
    setLessonName(
      id
        ? timetable[dayOfWeek].find(schedule => schedule.id === id).lessonName
        : ""
    );
    setInstructorName(
      id
        ? timetable[dayOfWeek].find(schedule => schedule.id === id)
            .instructorName
        : ""
    );
    setCapacity(
      id
        ? timetable[dayOfWeek].find(schedule => schedule.id === id).capacity
        : 999
    );
    setRegularsOnly(
      id
        ? timetable[dayOfWeek].find(schedule => schedule.id === id)
            .regularsOnly || false
        : false
    );
  }, [dayOfWeek, id, timetable]);

  const handleClose = () => {
    setModalPayload({});
  };

  const handleConfirm = () => {
    const schedulesClone = clone(timetable[dayOfWeek]);
    const iso8601 = clone(timetable.iso8601);

    if (typeof capacity !== "number") {
      throw new Error("capacity is not a number");
    }

    if (id) {
      const updatedSchedules = schedulesClone.map(schedule => {
        if (schedule.id === id) {
          schedule.hour = moment(iso8601 + " " + timeString).hour();
          schedule.minute = moment(iso8601 + " " + timeString).minute();
          schedule.timeString = timeString;
          schedule.lessonName = lessonName;
          schedule.instructorName = instructorName;
          schedule.capacity = capacity;
          schedule.regularsOnly = regularsOnly;
          return schedule;
        } else {
          return schedule;
        }
      });

      sortSchedules(updatedSchedules);

      const fieldsToUpdate = {
        [dayOfWeek]: updatedSchedules,
        id: timetable.id,
        doctype: timetable.doctype,
      };

      cloudUpdate(fieldsToUpdate);
    } else {
      const newSchedule = createScheduleWith({
        timeString,
        lessonName,
        instructorName,
        capacity,
        regularsOnly,
      });
      schedulesClone.push(newSchedule);
      sortSchedules(schedulesClone);

      cloudUpdate({
        [dayOfWeek]: schedulesClone,
        id: timetable.id,
        doctype: timetable.doctype,
      });
    }

    handleClose();
  };

  if (dayOfWeek) {
    const isWeekend =
      dayOfWeek === $daysOfWeek.saturday || dayOfWeek === $daysOfWeek.sunday;

    return (
      <div className="AddScheduleModal">
        <Modal
          appElement={document.getElementById("root")}
          isOpen={!!dayOfWeek}
          style={style}
        >
          <h3>
            {id ? "Edit" : "Add"} {localizeWeek(dayOfWeek)}
          </h3>
          <div>
            {isWeekend ? (
              <WeekendTimeStringSelect
                value={timeString}
                onChange={e => setTimeString(e.target.value)}
              />
            ) : (
              <WeekdayTimeStringSelect
                value={timeString}
                onChange={e => setTimeString(e.target.value)}
              />
            )}
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

          <br />

          <div className="fr">
            <button onClick={handleClose}>Cancel</button>
            <button
              onClick={handleConfirm}
              disabled={!timeString || !lessonName || !instructorName}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default EditScheduleModal;

// ─────────────────────────────────────────────────────────────── sort ───┐
export const sortSchedules = schedulesClone => {
  schedulesClone.sort((a, b) => {
    if (a.lessonName < b.lessonName) {
      return -1;
    }
    if (a.lessonName > b.lessonName) {
      return 1;
    }
    return 0;
  });
  schedulesClone.sort((a, b) => {
    return a.hour - b.hour;
  });

  return schedulesClone;
};
// ────────────────────────────────────────────────────────────────────────┘
