import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  filterReservations,
  selectLessons,
  selectTickets,
} from "../redux/selector";
import "../style/_studentReservationModule.scss";
import { useState } from "react";
import EditReservationModal from "../modal/EditReservationModal";
import { cloudUpdate, cloudDelete } from "../firebase/firestore";

const clone = require("rfdc")();

const StudentReservationModule = () => {
  const { id } = useParams();
  const reservations = useSelector(state => filterReservations(state, id));
  const lessons = useSelector(selectLessons);
  const tickets = useSelector(selectTickets);

  const [modalPayload, setModalPayload] = useState({});

  const handleEdit = event => {
    setModalPayload({
      showEditReservation: true,
      reservationID: event.target.dataset.reservationid,
    });
  };

  const handleDelete = event => {
    const reservationID = event.target.dataset.reservationid;
    const targetTicket = tickets.find(
      ticket => ticket.usedOn === reservationID
    );
    const targetReservation = reservations.find(
      resv => resv.id === reservationID
    );

    if (window.confirm(`本当に削除しますか？この操作は後戻りできません。`)) {
      if (targetTicket && targetReservation) {
        const ticketClone = clone(targetTicket);
        ticketClone.usedOn = null;

        cloudUpdate(ticketClone);
        cloudDelete(targetReservation);
      } else {
        window.alert("処理に問題がありました。再度試してください。");
      }
    }
  };

  return (
    <div className="StudentReservationModule">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://lacoms-student-center.herokuapp.com/redirect/" + id}
      >
        生徒予約画面を開く
      </a>

      <div className="student-reservation-table">
        <p>生徒授業予約一覧</p>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>時間</th>
              <th>クラス</th>
              <th>講師</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(resv => {
              const {
                iso8601,
                timeString,
                lessonID,
                isNewStudent,
                isFirstLesson,
                isRegulars,
                state,
                id: reservationID,
              } = resv;
              const { lessonName, instructorName } =
                lessons.find(lesson => lesson.id === lessonID) || {};

              return (
                <tr key={reservationID}>
                  <td>{iso8601}</td>
                  <td>{timeString}</td>
                  <td>{lessonName}</td>
                  <td>{instructorName}</td>
                  <td>{localizeState(state)}</td>
                  <td>{isNewStudent && "新入生"}</td>
                  <td>{isFirstLesson && "初回"}</td>
                  <td>{isRegulars && "レギュラー"}</td>
                  <td>
                    <button
                      onClick={handleEdit}
                      data-reservationid={reservationID}
                    >
                      変更
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={handleDelete}
                      data-reservationid={reservationID}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <EditReservationModal
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
      />
    </div>
  );
};

export default StudentReservationModule;

export const $state = {
  reserved: "reserved",
  attended: "attended",
  cancelled: "cancelled",
  cancelledWithPenalty: "cancelledWithPenalty",
  cancelledWithPenaltyButRefundedAnyways:
    "cancelledWithPenaltyButRefundedAnyways",
  noShow: "noShow",
};

export const localizeState = state => {
  switch (state) {
    case $state.reserved:
      return "出席予定";
    case $state.attended:
      return "出席";
    case $state.cancelled:
      return "キャンセル";
    case $state.cancelledWithPenalty:
      return "当日キャンセル";
    case $state.cancelledWithPenaltyButRefundedAnyways:
      return "ターム内1回目の当日キャンセルにき、通常キャンセル扱い";
    case $state.noShow:
      return "無断欠席";
    default:
      throw new Error("undefined state");
  }
};
