import React from "react";
import FilterNames from "../component/FilterNames";
import TableStudentAbstracts from "../component/TableStudentAbstracts";

const HomePage = () => {
  return (
    <div className="HomePage">
      <FilterNames />
      <TableStudentAbstracts />
    </div>
  );
};

export default HomePage;
