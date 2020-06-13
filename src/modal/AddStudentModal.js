import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectShowAddStudentModal, selectStudents } from "../redux/selector";
import { showAddStudentModal } from "../redux/action";
import { cloudCreate } from "../firebase/firestore";

import { useHistory } from "react-router-dom";
import { student$info } from "../page/StudentPage";
import { createStudentWith } from "../template/student";
import { $status, createMembershipWith } from "../template/membership";

export const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddStudentModal = () => {
  const history = useHistory();
  const show = useSelector(selectShowAddStudentModal);
  const students = useSelector(selectStudents);
  const dispatch = useDispatch();

  const [showOverride, setShowOverride] = useState(false);

  const [lastName_kanji, setLastName_kanji] = useState("");
  const [firstName_kanji, setFirstName_kanji] = useState("");
  const [lastName_hiragana, setLastName_hiragana] = useState("");
  const [firstName_hiragana, setFirstName_hiragana] = useState("");
  const [shouldCreateMembership, setCreateMembership] = useState(false);

  const hiraganaOnly = /^[\u3040-\u309f]+$/;
  const hasEiji = /[a-zA-Z]/;
  const hasSpace = /( |　)+/;

  const checkInput = (value, type) => {
    let bot = document.getElementById("bot");
    let lastName_kanji = document.getElementById("lastName_kanji").value;
    let firstName_kanji = document.getElementById("firstName_kanji").value;
    let lastName_hiragana = document.getElementById("lastName_hiragana").value;
    let firstName_hiragana = document.getElementById("firstName_hiragana")
      .value;

    if (hasEiji.test(lastName_kanji)) {
      bot.innerText = "姓 (漢字) : \n漢字で入力されていません。";
    } else if (hasEiji.test(firstName_kanji)) {
      bot.innerText = "名 (漢字) : \n漢字で入力されていません。";
    } else if (lastName_hiragana && !hiraganaOnly.test(lastName_hiragana)) {
      bot.innerText = "姓 (ひらがな): \nひらがなで入力されていません。";
    } else if (firstName_hiragana && !hiraganaOnly.test(firstName_hiragana)) {
      bot.innerText = "名 (ひらがな): \nひらがなで入力されていません。";
    } else if (hasSpace.test(lastName_kanji)) {
      bot.innerText = "姓 (漢字) : \n空白文字が入力されています。";
    } else if (hasSpace.test(firstName_kanji)) {
      bot.innerText = "名 (漢字) : \n空白文字が入力されています。";
    } else if (hasSpace.test(lastName_hiragana)) {
      bot.innerText = "姓 (ひらがな) : \n空白文字が入力されています。";
    } else if (hasSpace.test(firstName_hiragana)) {
      bot.innerText = "名 (ひらがな) : \n空白文字が入力されています。";
    } else {
      bot.innerText = "";
    }

    if (
      lastName_kanji &&
      firstName_kanji &&
      lastName_hiragana &&
      firstName_hiragana &&
      !bot.innerText
    ) {
      if (
        students.find(student => {
          const {
            lastName_kanji: lN_kanji,
            firstName_kanji: fN_kanji,
            lastName_hiragana: lN_hiragana,
            firstName_hiragana: fN_hiragana,
          } = student;

          return (
            lastName_kanji === lN_kanji &&
            firstName_kanji === fN_kanji &&
            lastName_hiragana === lN_hiragana &&
            firstName_hiragana === fN_hiragana
          );
        })
      ) {
        bot.innerText = `${lastName_kanji} ${firstName_kanji}　はすでに存在しています。`;
        setShowOverride(true);
      }
    }
  };

  const updateLastName_kanji = event => {
    setLastName_kanji(event.target.value);
    checkInput();
  };
  const updateFirstName_kanji = event => {
    setFirstName_kanji(event.target.value);
    checkInput();
  };
  const updateLastName_hiragana = event => {
    setLastName_hiragana(event.target.value);
    checkInput();
  };
  const updateFirstName_hiragana = event => {
    setFirstName_hiragana(event.target.value);
    checkInput();
  };

  const handleCheck = event => {
    setCreateMembership(event.target.checked);
  };

  const add = () => {
    const student = createStudentWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
    });

    cloudCreate(student).then(() => {
      close();
      history.push(student$info + student.id);
    });

    if (shouldCreateMembership) {
      const membership = createMembershipWith({
        lastName_kanji,
        firstName_kanji,
        lastName_hiragana,
        firstName_hiragana,

        uid: student.id,
        iso8601: moment().format("YYYY-MM-DD"),
        status: $status.active,
        isInital: true,
      });
      cloudCreate(membership);
    }
  };

  const close = () => {
    dispatch(showAddStudentModal(false));
    clear();
  };

  const clear = () => {
    setLastName_kanji("");
    setFirstName_kanji("");
    setLastName_hiragana("");
    setFirstName_hiragana("");
  };

  const override = () => {
    const bot = document.getElementById("bot");
    bot.innerText = "";
    setShowOverride(false);
  };

  const hasBlank = () => {
    const bot = document.getElementById("bot");
    return (
      !lastName_kanji ||
      !firstName_kanji ||
      !lastName_hiragana ||
      !firstName_hiragana ||
      bot.innerText
    );
  };

  return (
    <div className="AddStudentModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={show}
        style={style}
      >
        <h1>
          {lastName_kanji} {firstName_kanji}
        </h1>
        <p>
          {lastName_hiragana} {firstName_hiragana}
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="">姓 (漢字)</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName_kanji"
                  placeholder="代々木（例）"
                  autoComplete="off"
                  value={lastName_kanji}
                  onChange={updateLastName_kanji}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">名 (漢字)</label>
              </td>
              <td>
                <input
                  type="text"
                  id="firstName_kanji"
                  placeholder="太郎（例）"
                  autoComplete="off"
                  value={firstName_kanji}
                  onChange={updateFirstName_kanji}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">姓 (ひらがな)</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName_hiragana"
                  placeholder="よよぎ（例）"
                  autoComplete="off"
                  value={lastName_hiragana}
                  onChange={updateLastName_hiragana}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">名 (ひらがな)</label>
              </td>
              <td>
                <input
                  type="text"
                  id="firstName_hiragana"
                  placeholder="たろう（例）"
                  autoComplete="off"
                  value={firstName_hiragana}
                  onChange={updateFirstName_hiragana}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input
            type="checkbox"
            checked={shouldCreateMembership}
            onChange={handleCheck}
          />
          <label>Issue new membership (新規入会)</label>
        </div>
        <div style={{ minHeight: "4rem", color: "red", fontSize: "0.9rem" }}>
          <p id="bot"></p>
          {showOverride && (
            <button
              onClick={override}
              style={{ backgroundColor: "salmon", color: "white" }}
            >
              Override 警告を無効化する
            </button>
          )}
        </div>
        <div>
          <button onClick={close}>Cancel</button>
          <button onClick={add} disabled={hasBlank()}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
