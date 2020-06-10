import React from "react";
import StudentRouter from "../router/StudentRouter";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>{id}</p>
      <StudentRouter />
    </div>
  );
};

export default StudentPage;
