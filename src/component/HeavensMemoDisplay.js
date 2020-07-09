import React from "react";
import { useSelector } from "react-redux";
import { selectHeavensMemos } from "../redux/selector";
import { useState } from "react";
import EditHeavensMemoModule from "../module/EditHeavensMemoModule";

const HeavensMemoDisplay = props => {
  const { iso8601 } = props;
  const heavensMemos = useSelector(selectHeavensMemos);
  const memo = heavensMemos.find(M => M.iso8601 === iso8601) || {};
  const { content } = memo;

  const [modalPayload, setModalPayload] = useState({});

  const handleClick = () => {
    setModalPayload({
      show: true,
      iso8601,
    });
  };

  return (
    <div className="HeavensMemoDisplay">
      <p
        style={{
          border: "1px solid whitesmoke",
          padding: "0.5rem",
          marginRight: "1rem",
          display: "inline-block",
          minWidth: "70%",
          color: "dodgerblue",
          fontSize: "1.1rem",
        }}
      >
        {content ? content : "　"}
      </p>
      <button onClick={handleClick}>神様のメモ帳</button>
      <EditHeavensMemoModule
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
      />
    </div>
  );
};

export default HeavensMemoDisplay;
