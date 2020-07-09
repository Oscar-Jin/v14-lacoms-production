import React from "react";
import Modal from "react-modal";

import { useSelector } from "react-redux";
import { selectHeavensMemos } from "../redux/selector";
import { useState } from "react";
import { useEffect } from "react";
import { cloudUpdate, cloudCreate } from "../firebase/firestore";
import { style } from "../modal/AddStudentModal";
import { createHeavensMemo } from "../template/memo";

const clone = require("rfdc")();

const EditHeavensMemoModule = props => {
  const { modalPayload, setModalPayload } = props;
  const { iso8601, show } = modalPayload;
  const memos = useSelector(selectHeavensMemos);
  const memo = memos.find(M => M.iso8601 === iso8601) || {};

  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(memo?.content || "");
  }, [memo]);

  const handleSave = () => {
    if (memo.id) {
      const memoClone = clone(memo);
      memoClone.content = content;
      cloudUpdate(memoClone);
    } else {
      const heavensMemo = createHeavensMemo(iso8601, content);
      console.log(heavensMemo);
      cloudCreate(heavensMemo);
    }
    setModalPayload({});
    setContent("");
  };

  return (
    <div className="EditHeavensMemoModule">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={show}
        style={style}
      >
        <h3>神様のメモ帳</h3>
        <hr />
        <textarea
          cols="30"
          rows="5"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <div className="fr">
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default EditHeavensMemoModule;
