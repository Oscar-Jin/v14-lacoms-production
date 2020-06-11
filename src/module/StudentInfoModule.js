import React from "react";
import { studentInfoUX, useStudenInfoTypeConverter } from "../ux/studentInfoUX";
import useCheckoutStudent from "../hook/useCheckoutStudent";
import "../style/_studentInfoModule.scss";

const StudentInfoModule = () => {
  const [student] = useCheckoutStudent();
  const typeConverter = useStudenInfoTypeConverter();

  const edit = event => {};

  const tableRows = studentInfoUX.map(ux => {
    const { title, subTitle, referenceKey, noteReferenceKey, readOnly } = ux;

    return (
      <tr key={referenceKey}>
        <td>
          <span>{title}</span>
          <span className="subtitle">({subTitle})</span>
          <p>note:　</p>
        </td>
        <td>
          {typeConverter(ux)}
          <p>{student[noteReferenceKey]}　</p>
        </td>
        <td>
          <button
            disabled={readOnly}
            onClick={edit}
            data-refkey={referenceKey}
            data-noterefkey={noteReferenceKey}
          >
            {readOnly ? "Locked" : "Edit"}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="StudentInfoModule">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Info</th>
            <th>..</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default StudentInfoModule;

/*
const InfoModule = props => {
  const { student = {} } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  // style
  const topBorder = { borderTop: "1px solid gray" };
  const smallerFont = { fontSize: "0.9rem" };
  const textLeft = { textAlign: "left" };
  //

  if (!student.id) {
    history.push("/");
    console.warn("student without valid id, will redirect to '/'");
  }

  const handleEdit = event => {
    let refKey = event.target.dataset.refkey;
    let noteRefKey = event.target.dataset.noterefkey;
    ReactDOM.render(
      <EditStudentInfoModal
        dispatch={dispatch}
        student={student}
        referenceKey={refKey}
        noteReferenceKey={noteRefKey}
      />,
      document.getElementById(k.EditStudentInfoModal)
    );
  };

  const tableRows = studentInfoUI.map(
    ({
      title,
      subTitle,
      referenceKey,
      noteReferenceKey,
      dataType,
      readOnly,
    }) => [
      <tr key={referenceKey}>
        <td style={topBorder}>
          <span>{title} </span>
          <span style={smallerFont}>{subTitle ? `(${subTitle})` : null}</span>
        </td>
        {dataType === k.url ? (
          <td style={topBorder}>
            <a
              href={student[referenceKey]}
              rel="noopener noreferrer"
              target="_blank"
            >
              {student[referenceKey]}
            </a>
          </td>
        ) : dataType === k.email ? (
          <td style={topBorder}>
            <a href={"mailto:" + student[referenceKey]}>
              {student[referenceKey]}
            </a>
          </td>
        ) : (
          <td style={topBorder}>{student[referenceKey]}</td>
        )}
        <td style={topBorder}>
          <button
            disabled={readOnly}
            onClick={handleEdit}
            data-refkey={referenceKey}
            data-noterefkey={noteReferenceKey}
          >
            {readOnly ? "Locked" : "Edit"}
          </button>
        </td>
      </tr>,
      <tr style={smallerFont} key={noteReferenceKey}>
        <td>note:</td>
        <td>{student[noteReferenceKey]}</td>
        <td></td>
      </tr>,
    ]
  );

  return (
    <div>
      <table style={textLeft}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Info</th>
            <th>..</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div id={k.EditStudentInfoModal}></div>
    </div>
  );
};
*/
