import React from "react";
import { fb } from "../firebase/config";
import "../style/_badgeServer.scss";

const BadgeServer = () => {
  return (
    <span className="BadgeServer" id={`${fb.name}-server`}>
      {fb.name} server
    </span>
  );
};

export default BadgeServer;
