import React from "react";
import { fb } from "../firebase/config";
import "../style/_badgeServer.scss";

const BadgeServer = () => {
  return (
    <span id={`${fb.name}-server`} className="BadgeServer">
      {fb.name} server
    </span>
  );
};

export default BadgeServer;
