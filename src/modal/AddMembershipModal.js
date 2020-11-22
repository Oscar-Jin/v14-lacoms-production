import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { style } from "./AddStudentModal";
import useCheckoutStudent from "../hook/useCheckoutStudent";
import { useSelector } from "react-redux";
import { showAddMembershipModal } from "../redux/action";
import {
  selectShowAddMembershipModal,
  filterMemberships,
} from "../redux/selector";
import { $status, createMembershipWith } from "../template/membership";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";

import "../style/_addMembershipModal.scss";
import { cloudCreate } from "../firebase/firestore";

registerLocale("ja", ja);
setDefaultLocale("ja");

const AddMembershipModal = () => {
  const [student, dispatch] = useCheckoutStudent();
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("");
  const [isInitial, setIsInitial] = useState(false);

  const [alreayExists, setAlreadyExists] = useState(false);
  const [priorToInital, setPriorToInital] = useState(false);
  const [nextMonthSelected, setNextMonthSelected] = useState(false);
  const [alreadyHasInitial, setAlreadyHasInitial] = useState(false);

  const show = useSelector(selectShowAddMembershipModal);
  const memberships = useSelector(state =>
    filterMemberships(state, student.id)
  );

  const add = () => {
    const {
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
    } = student;

    const membership = createMembershipWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
      iso8601: moment(date).format("YYYY-MM-DD"),
      status,
      isInitial,
    });

    cloudCreate(membership);
    close();
  };

  const validate = date => {
    const result = memberships.find(
      membership =>
        moment(membership.iso8601).format("YYYY-MM") ===
        moment(date).format("YYYY-MM")
    );
    const initialMembership = memberships.find(
      membership => membership.isInitial === true
    );
    const diffInDays = moment(date).diff(moment("2020-08-15"), "days");
    const diff = initialMembership
      ? moment(initialMembership.iso8601).diff(date, "days")
      : null;
    console.log(diff, "days");
    if (result) {
      console.log(result, "result");
      setAlreadyExists(true);
      setNextMonthSelected(false);
      setPriorToInital(false);
    } else if (diffInDays > 0) {
      setNextMonthSelected(true);
      setAlreadyExists(false);
      setPriorToInital(false);
    } else if (diff > 0) {
      setPriorToInital(true);
      setAlreadyExists(false);
      setNextMonthSelected(false);
    } else {
      setAlreadyExists(false);
      setNextMonthSelected(false);
      setPriorToInital(false);
    }
  };

  const checkInitial = checked => {
    const initialMembership = memberships.find(
      membership => membership.isInitial === true
    );

    console.log(initialMembership);
    console.log(checked);
    if (initialMembership && checked) {
      setAlreadyHasInitial(true);
    } else {
      setAlreadyHasInitial(false);
    }
  };

  const close = () => {
    dispatch(showAddMembershipModal(false));
    setDate(null);
    setStatus("");
    setIsInitial(false);
    setAlreadyExists(false);
    setPriorToInital(false);
    setNextMonthSelected(false);
    setAlreadyHasInitial(false);
  };

  return (
    <div className="AddMembershipModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={show}
        style={style}
      >
        <div className="membershipModalMain">
          <h3>Add Membership　月区分</h3>
          <p className="subtitle">＊過去の履歴もこちらで追加できます</p>
          <table>
            <tbody>
              <tr>
                <td>
                  <DatePicker
                    selected={date}
                    onChange={date => {
                      setDate(date);
                      validate(date);
                    }}
                    dateFormat="yyyy/MM"
                    showMonthYearPicker
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    onChange={e => {
                      setStatus(e.target.value);
                      console.log(e.target.value);
                    }}
                    value={status}
                  >
                    <option value="" disabled></option>
                    <option value={$status.active}>Active（在籍）</option>
                    <option value={$status.paused}>Paused（休会）</option>
                    <option value={$status.cancelled}>Cancelled（退会）</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={isInitial}
                    onChange={e => {
                      setIsInitial(e.target.checked);
                      checkInitial(e.target.checked);
                    }}
                  />
                  <label className="subtitle">最初に入会した月</label>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="bot">
            {alreayExists
              ? "The month you selected already exists in membership history"
              : nextMonthSelected
              ? "you are not allowed to select month that is in the future"
              : alreadyHasInitial
              ? "the month which membership was created already exists in membership hiostory"
              : priorToInital
              ? "you cannot select month that is prior to when the first membership is created"
              : ""}
          </p>
        </div>
        <div className="fr">
          <button onClick={close}>Cancel</button>
          <button
            onClick={add}
            disabled={
              alreayExists ||
              nextMonthSelected ||
              alreadyHasInitial ||
              priorToInital ||
              !date ||
              !status
            }
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddMembershipModal;
