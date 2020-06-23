import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { style } from "./AddStudentModal";
import { useState } from "react";
import { useEffect } from "react";
import WeekendTimeStringSelect from "../select/WeekendTimeStringSelect";
import WeekdayTimeStringSelect from "../select/WeekdayTimeStringSelect";
import LessonsNameSelect from "../select/LessonsNameSelect";
import InstructorNameSelect from "../select/InstructorNameSelect";
import CapacitySelect from "../select/CapacitySelect";
import RegularsOnlySelect from "../select/RegularsOnlySelect";
import { createLessonWith } from "../template/lesson";
import { cloudCreate } from "../firebase/firestore";

const AddNewLessonModal = props => {
  const { payload, setPayload } = props;
  const { showAddLessonModal, iso8601 } = payload || {};
  if (payload === undefined || setPayload === undefined) {
    throw new Error("props must be all provided");
  }

  const [timeString, setTimeString] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [capacity, setCapacity] = useState(999); // 無制限
  const [regularsOnly, setRegularsOnly] = useState(false);

  const handleAdd = () => {
    const lesson = createLessonWith({
      iso8601,
      timeString,
      lessonName,
      instructorName,
      capacity,
      regularsOnly,
    });

    cloudCreate(lesson);
    handleClose();
  };

  const handleClose = () => {
    setTimeString("");
    setLessonName("");
    setInstructorName("");
    setCapacity(999);
    setRegularsOnly(false);
    setPayload({});
  };

  return (
    <div className="AddNewLessonModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={showAddLessonModal}
        style={style}
      >
        <h3 className="red">
          試験中　Experimental, consult Kinchan before use
        </h3>
        <p className="">
          授業の追加：
          <span className="subtitle">
            月の時間割には反映されませんのでご注意ください。
          </span>
        </p>
        <hr />

        <div>
          <h4>
            {iso8601} {moment(iso8601).format("dddd")}
          </h4>
        </div>

        <div>
          {moment(iso8601).day() === 0 || moment(iso8601).day() === 6 ? (
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

        <div className="fr">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleAdd}>Add</button>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewLessonModal;
