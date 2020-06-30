import React from "react";
import { $daysOfWeek, localizeWeek } from "../module/ExecutiveTimetableModule";
import { useState } from "react";
import { remove } from "lodash";
import { cloudUpdate } from "../firebase/firestore";
import { localzieCapacity } from "../select/CapacitySelect";
import { checkLessonType } from "../page/SchedulePage";

const clone = require("rfdc")();

const ScheduleTable = props => {
  if (
    props.timetable === undefined ||
    props.dayOfWeek === undefined ||
    props.modalPayload === undefined ||
    props.setModalPayload === undefined
  ) {
    throw new Error("requires props not all supplied");
  }

  const [inRemoveMode, setInRemoveMode] = useState(false);
  const { timetable, dayOfWeek, setModalPayload } = props;
  const { isGenerated } = timetable;

  const [shouldHide, setShouldHide] = useState(true);

  const handleAdd = event => {
    const dayOfWeek = event.target.dataset.dayofweek;
    setModalPayload({ dayOfWeek });
  };

  const handleEdit = event => {
    const dayOfWeek = event.target.dataset.dayofweek;
    const id = event.target.dataset.id;
    setModalPayload({ dayOfWeek, id });
  };

  const toggleShouldHide = () => {
    setShouldHide(!shouldHide);
  };

  const handleRemove = event => {
    const dayOfWeek = event.target.dataset.dayofweek;
    const id = event.target.dataset.id;

    const timetableClone = clone(timetable);
    remove(timetableClone[dayOfWeek], schedule => schedule.id === id);
    sortTimetable(timetableClone);

    cloudUpdate(timetableClone);

    setInRemoveMode(!inRemoveMode);
  };

  let timeStrings = ["XX:XX"];

  return (
    <div key={dayOfWeek} className="weekly-table">
      <span>{localizeWeek(dayOfWeek)}</span>
      <button onClick={toggleShouldHide} className="fr">
        {shouldHide ? "Show" : "Hide All"}
      </button>
      <table>
        <tbody>
          {timetable[dayOfWeek].map((schedule, i) => {
            const {
              timeString,
              lessonName,
              instructorName,
              capacity,
              regularsOnly,
              id,
            } = schedule;
            const isOldSection = timeString === timeStrings[i];
            timeStrings.push(timeString);
            return (
              <tr key={id} className={isOldSection ? "" : "border-top"}>
                <td>{isOldSection ? "" : timeString}</td>
                <td className={checkLessonType(lessonName)}>{lessonName}</td>
                <td>{instructorName}</td>
                <td className="subtitle">{localzieCapacity(capacity)}</td>
                <td className="subtitle">
                  {localizeRegularsOnly(regularsOnly)}
                </td>
                <td>
                  <button
                    data-id={id}
                    data-dayofweek={dayOfWeek}
                    hidden={(shouldHide && isGenerated) || inRemoveMode}
                    className="edit-button"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    data-id={id}
                    data-dayofweek={dayOfWeek}
                    hidden={(shouldHide && isGenerated) || !inRemoveMode}
                    className="remove-button"
                    onClick={handleRemove}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        hidden={shouldHide && isGenerated}
        disabled={inRemoveMode}
        data-dayofweek={dayOfWeek}
        onClick={handleAdd}
      >
        + Add
      </button>
      <button
        hidden={shouldHide && isGenerated}
        onClick={() => setInRemoveMode(!inRemoveMode)}
      >
        {inRemoveMode ? "Cancel" : "Enable Remove"}
      </button>
    </div>
  );
};

export default ScheduleTable;

// ───────────────────────────────────────────────────────────── ヘルパー ───┐
export const sortTimetable = timetableClone => {
  Object.keys($daysOfWeek).forEach(dayOfWeek => {
    timetableClone[dayOfWeek].sort((a, b) => {
      if (a.lessonName < b.lessonName) {
        return -1;
      }
      if (a.lessonName > b.lessonName) {
        return 1;
      }
      return 0;
    });
    timetableClone[dayOfWeek].sort((a, b) => {
      return a.hour - b.hour;
    });
  });

  return timetableClone;
};

export const localizeRegularsOnly = regularsOnly => {
  return regularsOnly ? "レギュラーのみ" : "オープン";
};
// ────────────────────────────────────────────────────────────────────────┘
