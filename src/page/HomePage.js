import React from "react";
import FilterNames from "../component/FilterNames";
import TableStudentAbstracts from "../component/TableStudentAbstracts";
import ButtonAddStudent from "../component/ButtonAddStudent";

import "../style/_homePage.scss";
import AddStudentModal from "../modal/AddStudentModal";
import ButtonShowRemoveStudent from "../component/ButtonShowRemoveStudent";
import BadgeStudentCalcs from "../component/BadgeStudentCalcs";

const HomePage = () => {
  return (
    <div className="HomePage">
      <FilterNames />
      <BadgeStudentCalcs />
      <ButtonShowRemoveStudent />
      <TableStudentAbstracts />
      {/* <p>計X名</p> */}
      <ButtonAddStudent />
      <AddStudentModal />
    </div>
  );
};

export default HomePage;
