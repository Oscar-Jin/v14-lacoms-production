import React from "react";
import useStudentFilter from "../hook/useStudentFilter";
import { Link } from "react-router-dom";
import { localizeSex } from "../toolkit/localize";
import ButtonRemoveStudent from "./ButtonRemoveStudent";
import { student$info } from "../page/StudentPage";

const TableStudentAbstracts = () => {
  const students = useStudentFilter();

  const abstracts = students.map(student => {
    const {
      lastName_hiragana,
      firstName_hiragana,
      lastName_kanji,
      firstName_kanji,
      sex,
      id,
    } = student;
    return (
      <tr key={id}>
        <td>
          {lastName_hiragana} {firstName_hiragana}
        </td>
        <td>
          <Link to={student$info + id}>
            {lastName_kanji} {firstName_kanji}
          </Link>
        </td>
        <td>{localizeSex(sex, "short")}</td>
        <td>
          <ButtonRemoveStudent id={id} />
        </td>
      </tr>
    );
  });

  return (
    <div className="TableStudentAbstract">
      <table>
        <thead>
          <tr>
            <th>--</th>
            <th>----</th>
            <th>・</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{abstracts}</tbody>
      </table>
    </div>
  );
};

export default TableStudentAbstracts;
