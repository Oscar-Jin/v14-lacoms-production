import React from "react";
import Modal from "react-modal";
import { style } from "./AddStudentModal";
import ReactLoading from "react-loading";

const LoadingModal = props => {
  const { showLoading, setShowLoading } = props;
  if (showLoading === undefined || setShowLoading === undefined) {
    throw new Error("all props must be provided");
  }
  return (
    <div className="LoadingModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={showLoading}
        style={style}
      >
        <ReactLoading type="spin" color="#505050"></ReactLoading>
      </Modal>
    </div>
  );
};

export default LoadingModal;
