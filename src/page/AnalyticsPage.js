import React from "react";
import BadgeStatusCount from "../component/BadgeStatusCount";
import BadgeMaleFemaleRate from "../component/BadgeMaleFemaleRate";
import "../style/_analyticsPage.scss";

const AnalyticsPage = () => {
  return (
    <div className="AnalyticsPage">
      <div>
        <h2>LACOMS 全体数値</h2>
        <BadgeStatusCount />
        <BadgeMaleFemaleRate />
      </div>
    </div>
  );
};

export default AnalyticsPage;
