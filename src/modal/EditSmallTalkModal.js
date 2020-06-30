import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { selectLessons } from "../redux/selector";
import { style } from "./AddStudentModal";
import { useState } from "react";
import { useEffect } from "react";
import { cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const EditSmallTalkModal = props => {
  const { modalPayload, setModalPayload } = props;
  const { showSmallTalk, id } = modalPayload;

  const lessons = useSelector(selectLessons);
  const lesson = lessons.find(LESSON => LESSON.id === id) || {};

  const [smallTalk, setSmallTalk] = useState("");
  useEffect(() => {
    setSmallTalk(lesson.smallTalk);
  }, [lesson]);

  const handleSave = () => {
    const lessonClone = clone(lesson);
    lessonClone.smallTalk = smallTalk;
    cloudUpdate(lessonClone);

    setModalPayload({});
    setSmallTalk("");
  };

  return (
    <div className="EditSmallTalkModal">
      <Modal
        appElement={document.getElementById("root")}
        onRequestClose={handleSave}
        isOpen={showSmallTalk}
        style={style}
      >
        <h3>Small Talk</h3>
        <hr />
        <textarea
          cols="30"
          rows="5"
          value={smallTalk}
          onChange={e => setSmallTalk(e.target.value)}
        ></textarea>
        <br />
        <div className="fr">
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default EditSmallTalkModal;
