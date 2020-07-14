import React from "react";
import Modal from "react-modal";
import { style } from "./AddStudentModal";
import { useSelector } from "react-redux";
import { selectSubscriptions } from "../redux/selector";
import { $plan } from "../template/subscription";
import { cloudUpdate } from "../firebase/firestore";

const clone = require("rfdc")();

const OverrideSubscriptionModal = props => {
  const { modalPayload, setModalPayload } = props;
  const { showOverride, id } = modalPayload;

  const subscriptions = useSelector(selectSubscriptions);
  const subscription = subscriptions.find(S => S.id === id) || {};
  const { plan } = subscription;

  const subscriptionClone = clone(subscription);

  const handleOverrideToStandard = () => {
    if (
      window.confirm("Standard にオーバーライドします。本当によろしいですか？")
    ) {
      subscriptionClone.plan = $plan.standard;
      cloudUpdate(subscriptionClone);
      handleClose();
    }
  };

  const handleOverrideToStandardPlus = () => {
    if (
      window.confirm(
        "Standard Plus にオーバーライドします。本当によろしいですか？"
      )
    ) {
      subscriptionClone.plan = $plan.standardPlus;
      cloudUpdate(subscriptionClone);
      handleClose();
    }
  };

  const handleOverrideToFast = () => {
    if (window.confirm("Fast にオーバーライドします。本当によろしいですか？")) {
      subscriptionClone.plan = $plan.fast;
      cloudUpdate(subscriptionClone);
      handleClose();
    }
  };

  const handleOverrideToExtremelyFast = () => {
    if (
      window.confirm(
        "Extremely Fast にオーバーライドします。本当によろしいですか？"
      )
    ) {
      subscriptionClone.plan = $plan.extremelyFast;
      cloudUpdate(subscriptionClone);
      handleClose();
    }
  };

  const handleOverrideToPause = () => {
    if (
      window.confirm(
        "Pause / Halt にオーバーライドします。本当によろしいですか？"
      )
    ) {
      subscriptionClone.plan = $plan.none;
      cloudUpdate(subscriptionClone);
      handleClose();
    }
  };

  const handleClose = () => {
    setModalPayload({});
  };

  return (
    <div className="OverrideSubscriptionModal">
      <Modal
        appElement={document.getElementById("root")}
        onRequestClose={handleClose}
        isOpen={showOverride}
        style={style}
      >
        <button onClick={handleClose}>x</button>
        <h2 style={{ color: "red" }}>
          ※これは非常に危険な操作です。管理者以外は絶対に利用しないでください!!
        </h2>
        <h3 style={{ color: "red" }}>
          授業料担当者向け専用：　プランオーバーライド（最終手段）
        </h3>
        <p>
          {
            "注意：プランをオーバーライドしても、既に発券済の場合は、\n定期券の枚数に変わりはありません。プランに応じて定期券を手動で追加・削除する必要があります。"
          }
        </p>
        <br />
        <div style={{ border: "2px dashed orange" }}>
          <button
            style={{ margin: "5px" }}
            onClick={handleOverrideToStandard}
            disabled={plan === $plan.standard}
          >
            Standard に強制変更
          </button>
          <button
            style={{ margin: "5px" }}
            onClick={handleOverrideToStandardPlus}
            disabled={plan === $plan.standardPlus}
          >
            Standard Plus に強制変更
          </button>
          <button
            style={{ margin: "5px" }}
            onClick={handleOverrideToFast}
            disabled={plan === $plan.fast}
          >
            Fast に強制変更
          </button>
          <button
            style={{ margin: "5px" }}
            onClick={handleOverrideToExtremelyFast}
            disabled={plan === $plan.extremelyFast}
          >
            Extremely Fast に強制変更
          </button>
          <button
            style={{ margin: "5px" }}
            onClick={handleOverrideToPause}
            disabled={plan === $plan.none}
          >
            Pause / Halt に強制変更
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OverrideSubscriptionModal;
