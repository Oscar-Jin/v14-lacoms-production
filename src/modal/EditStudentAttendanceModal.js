import React from "react";
import Modal from "react-modal";
import { style } from "./AddStudentModal";
import { useSelector } from "react-redux";
import { selectReservations } from "../redux/selector";
import { useState } from "react";
import { $state } from "../module/StudentReservationModule";
import { useEffect } from "react";
import { cloudUpdate } from "../firebase/firestore";
import { Link } from "react-router-dom";
import { student$info } from "../page/StudentPage";

const clone = require("rfdc")();

const EditStudentAttendanceModal = props => {
  const { modalPayload, setModalPayload } = props;
  const { showAttendance, id, uid } = modalPayload;

  const reservations = useSelector(selectReservations);
  const reservation = reservations.find(resv => resv.id === id) || {};
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    isNewStudent,
    isFirstLesson,
    isRegulars,
  } = reservation;

  console.log(reservation);
  console.log(id);

  const [state, setState] = useState($state.reserved);
  const [assignmentCheck, setAssignmentCheck] = useState("");
  const [comtanCheck, setComtanCheck] = useState("");

  useEffect(() => {
    setState(reservation.state);
    setAssignmentCheck(reservation.assignmentCheck || "");
    setComtanCheck(reservation.comtanCheck || "");
  }, [reservation]);

  const handleChangeState = event => {
    const reservationClone = clone(reservation);
    reservationClone.state = event.target.value;
    cloudUpdate(reservationClone);
  };

  const handleChangeAssignment = event => {
    const reservationClone = clone(reservation);
    reservationClone.assignmentCheck = event.target.value;
    cloudUpdate(reservationClone);
  };

  const handleCheckComtan = event => {
    const reservationClone = clone(reservation);
    reservationClone.comtanCheck = event.target.value;
    cloudUpdate(reservationClone);
  };

  const handleClose = () => {
    setState($state.reserved);
    setAssignmentCheck("");
    setComtanCheck("");
    setModalPayload({});
  };

  return (
    <div className="EditStudentAttendanceModal">
      <Modal
        appElement={document.getElementById("root")}
        onRequestClose={handleClose}
        isOpen={showAttendance}
        style={style}
      >
        <button onClick={handleClose}>x</button>
        <h3>
          {lastName_kanji} {firstName_kanji}
          {"  "}
          <span style={{ fontSize: "1rem" }}>
            {isNewStudent && "新入生"}　{isFirstLesson && "初回"}{" "}
            {isRegulars && "レギュラー"}
          </span>
          <span style={{ fontSize: "1rem", float: "right", paddingTop: "4px" }}>
            <Link to={student$info + uid}>Info</Link>
          </span>
        </h3>
        <span style={{ fontSize: "0.85rem", marginTop: 0 }}>
          {lastName_hiragana} {firstName_hiragana}{" "}
        </span>

        <hr />
        <label>出席：</label>
        <select value={state} onChange={handleChangeState}>
          <option value={$state.reserved}></option>
          <option value={$state.attended}>出席</option>
          <option value={$state.noShow}>無断欠席</option>
        </select>
        <label>課題：</label>
        <AssignmentCheckSelect
          assignmentCheck={assignmentCheck}
          onChange={handleChangeAssignment}
        />
        <label>COM単：</label>
        <select value={comtanCheck} onChange={handleCheckComtan}>
          <option value=""></option>
          <option value="◯">◯</option>
          <option value="△">△</option>
          <option value="✕">✕</option>
          <option value="ー">ー</option>
          <option value="登録が必要">登録が必要</option>
          <option value="90+">90+</option>
          <option value="80+">80+</option>
          <option value="70+">70+</option>
          <option value="60+">60+</option>
          <option value="50+">50+</option>
        </select>
        <p className="">
          COM単：○, △, ー 以外はCHECK COMPLETEと看做されません。
        </p>
        <br />
      </Modal>
    </div>
  );
};

export default EditStudentAttendanceModal;

const AssignmentCheckSelect = props => {
  const { assignmentCheck, onChange } = props;

  return (
    <select value={assignmentCheck} onChange={onChange}>
      <option value=""></option>
      <option value="水野◯">水野◯</option>
      <option value="水野▲">水野▲</option>
      <option value="水野△">水野△</option>
      <option value="水野×">水野×</option>
      <option value="金村◯">金村◯</option>
      <option value="金村▲">金村▲</option>
      <option value="金村△">金村△</option>
      <option value="金村×">金村×</option>
      <option value="向井◯">向井◯</option>
      <option value="向井▲">向井▲</option>
      <option value="向井△">向井△</option>
      <option value="向井×">向井×</option>
      <option value="坂井◯">坂井◯</option>
      <option value="坂井▲">坂井▲</option>
      <option value="坂井△">坂井△</option>
      <option value="坂井×">坂井×</option>
      <option value="金丸◯">金丸◯</option>
      <option value="金丸▲">金丸▲</option>
      <option value="金丸△">金丸△</option>
      <option value="金丸×">金丸×</option>
      <option value="日永◯">日永◯</option>
      <option value="日永▲">日永▲</option>
      <option value="日永△">日永△</option>
      <option value="日永×">日永×</option>
      <option value="ジャス◯">ジャス◯</option>
      <option value="ジャス▲">ジャス▲</option>
      <option value="ジャス△">ジャス△</option>
      <option value="ジャス×">ジャス×</option>
      <option value="遠藤◯">遠藤◯</option>
      <option value="遠藤▲">遠藤▲</option>
      <option value="遠藤△">遠藤△</option>
      <option value="遠藤×">遠藤×</option>
      <option value="鈴木◯">鈴木◯</option>
      <option value="鈴木▲">鈴木▲</option>
      <option value="鈴木△">鈴木△</option>
      <option value="鈴木×">鈴木×</option>
      <option value="高嶋◯">高嶋◯</option>
      <option value="高嶋▲">高嶋▲</option>
      <option value="高嶋△">高嶋△</option>
      <option value="高嶋×">高嶋×</option>
      <option value="吳◯">吳◯</option>
      <option value="吳▲">吳▲</option>
      <option value="吳△">吳△</option>
      <option value="吳×">吳×</option>
      <option value="神崎◯">神崎◯</option>
      <option value="神崎▲">神崎▲</option>
      <option value="神崎△">神崎△</option>
      <option value="神崎×">神崎×</option>
      <option value="未消化１">未消化１</option>
      <option value="未消化２">未消化２</option>
      <option value="未消化３">未消化３</option>
      <option value="未消化４">未消化４</option>
    </select>
  );
};
