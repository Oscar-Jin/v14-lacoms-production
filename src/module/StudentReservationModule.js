import React from "react";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { filterReservations } from "../redux/selector";

// import construction1 from "../asset/construction1.png";

const StudentReservationModule = () => {
  const { id } = useParams();
  // const reservations = useSelector(state => filterReservations(state, id));

  // const initialReservation = {};
  // const latestReservation = {};

  return (
    <div className="StudentReservationModule">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://lacoms-student-center.herokuapp.com/redirect/" + id}
      >
        生徒予約画面を開く
      </a>
    </div>
  );
};

export default StudentReservationModule;
