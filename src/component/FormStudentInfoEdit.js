import React, { useState } from "react";
import { studentInfoUX, switchInputType } from "../ux/studentInfoUX";
import { useSelector } from "react-redux";
import { selectShowEditStudentModalBundle } from "../redux/selector";
import useCheckoutStudent from "../hook/useCheckoutStudent";

import trim from "lodash/trim";
import { cloudUpdate } from "../firebase/firestore";

const FormStudentInfoEdit = props => {
  const { close } = props;
  const { referenceKey, noteReferenceKey } = useSelector(
    selectShowEditStudentModalBundle
  );
  const [student] = useCheckoutStudent();
  const [subject, setSubject] = useState(student[referenceKey] || "");
  const [note, setNote] = useState(student[noteReferenceKey] || "");
  const [modified, setModified] = useState(false);

  const { title, subTitle, dataType } =
    studentInfoUX.find(ux => ux.referenceKey === referenceKey) || {};
  const { id, doctype } = student;

  const save = event => {
    event.preventDefault();
    setSubject(trim(subject));
    setNote(trim(note));

    const pack = noteReferenceKey
      ? {
          [referenceKey]: subject,
          [noteReferenceKey]: note,

          updatedOn: new Date().toISOString(),
          updatedBy: "lacoms",
          doctype,
          id,
        }
      : {
          [referenceKey]: subject,

          updatedOn: new Date().toISOString(),
          updatedBy: "lacoms",
          doctype,
          id,
        };

    cloudUpdate(pack);
    close();
  };

  const updateSubject = event => {
    setSubject(event.target.value);
    setModified(true);
  };
  const updateNote = event => {
    setNote(event.target.value);
    setModified(true);
  };

  return (
    <form onSubmit={save}>
      <label>
        {title} {subTitle ? `(${subTitle})` : " "}
      </label>
      <br />
      {switchInputType(dataType, subject, updateSubject)}
      <br />
      {dataType === "notes" ? (
        <div />
      ) : (
        <>
          <label>note:</label>
          <br />
          <textarea
            cols="30"
            rows="5"
            value={note}
            autoComplete="off"
            onChange={updateNote}
          ></textarea>
        </>
      )}
      <br />
      <button type="submit" style={{ float: "right" }} disabled={!modified}>
        保存
      </button>
    </form>
  );
};

export default FormStudentInfoEdit;
