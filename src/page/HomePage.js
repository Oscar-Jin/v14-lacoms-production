import React from "react";
import FilterNames from "../component/FilterNames";
import TableStudentAbstracts from "../table/StudentAbstractTable";

import "../style/_homePage.scss";
import AddStudentModal from "../modal/AddStudentModal";
import ButtonShowRemoveStudent from "../button/StudentShowRemoveButton";
import BadgeStudentCalcs from "../component/BadgeStudentCalcs";
import ButtonAddStudent from "../button/StudentAddButton";
import FilterMemberships from "../component/FilterMemberships";

const HomePage = () => {
  return (
    <div className="HomePage">
      <FilterNames />
      <FilterMemberships />
      <BadgeStudentCalcs />

      <ButtonAddStudent />

      <ButtonShowRemoveStudent />

      <TableStudentAbstracts />
      <ButtonAddStudent />

      <AddStudentModal />
    </div>
  );
};

export default HomePage;
