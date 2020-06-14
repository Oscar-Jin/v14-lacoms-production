import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { filterReservations } from "../redux/selector";

import construction1 from "../asset/construction1.png";

const StudentReservationModule = () => {
  // const { id } = useParams();
  // const reservations = useSelector(state => filterReservations(state, id));

  // const initialReservation = {};
  // const latestReservation = {};

  return (
    <div className="StudentReservationModule">
      <img src={construction1} alt="under construction" width="200" />
      <p>StudentReservationModule</p>
    </div>
  );
};

export default StudentReservationModule;
