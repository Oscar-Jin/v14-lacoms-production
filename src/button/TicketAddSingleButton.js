import React from "react";
import moment from "moment";
import { cloudCreate } from "../firebase/firestore";
import { createTicketWith, $type } from "../template/ticket";
import { useSelector } from "react-redux";
import { findStudent } from "../redux/selector";
import { useParams } from "react-router-dom";

const ButtonAddSingleTicket = props => {
  const { monthSelected } = props;
  const { id } = useParams();
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
  } = useSelector(state => findStudent(state, id));

  if (!monthSelected) {
    throw new Error("monthSelected must be provied as prop");
  }

  const add = () => {
    const ticket = createTicketWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
      iso8601: moment(monthSelected).format("YYYY-MM-DD"),
      type: $type.singlePurchase,
    });

    if (window.confirm("本当に発券しますか？")) {
      cloudCreate(ticket);
    }
  };

  return (
    <button className="ButtonAddSingleTicket" onClick={add}>
      一枚発券する
    </button>
  );
};

export default ButtonAddSingleTicket;
