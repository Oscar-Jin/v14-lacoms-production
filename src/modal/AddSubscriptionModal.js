import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { style } from "./AddStudentModal";
import { useSelector, useDispatch } from "react-redux";
import { selectShowAddSubscriptionModal, findStudent } from "../redux/selector";
import { useParams } from "react-router-dom";
import { localizePlan } from "../module/StudentSubscriptionModule";
import { showAddSubscriptionModal } from "../redux/action";
import { $plan, createSubscriptionWith } from "../template/subscription";
import { cloudCreate } from "../firebase/firestore";

const AddSubscriptionModal = () => {
  const { id } = useParams();
  const student = useSelector(state => findStudent(state, id));
  const dispatch = useDispatch();

  const thisMonth = moment();
  const nextMonth = moment().add(1, "month");

  const show = useSelector(selectShowAddSubscriptionModal);

  const add = () => {
    const {
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
    } = student;
    const iso8601 = nextMonth.format("YYYY-MM-DD");
    const plan = document.getElementById("plan-select").value;

    const suscription = createSubscriptionWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
      iso8601,
      plan,
    });

    cloudCreate(suscription);
    close();
  };

  const close = () => {
    document.getElementById("plan-select").value = $plan.standard;
    dispatch(showAddSubscriptionModal(false));
  };

  return (
    <div className="AddSubscriptionModal">
      <Modal
        appElement={document.getElementById("root")}
        isOpen={show}
        style={style}
      >
        <p className="info">
          ※{thisMonth.format("M月")}
          は入会初月のため、プラン設定はできません。必要に応じて個別発券してください。（既に在籍している生徒も当月のプラン設定はできません）
        </p>
        <h3>{nextMonth.format("M月")}のサブスクリプション：</h3>

        <div>
          <select id="plan-select">
            <option value={$plan.standard}>
              {localizePlan($plan.standard)}
            </option>
            <option value={$plan.standardPlus}>
              {localizePlan($plan.standardPlus)}
            </option>
            <option value={$plan.fast}>{localizePlan($plan.fast)}</option>
            <option value={$plan.extremelyFast}>
              {localizePlan($plan.extremelyFast)}
            </option>
          </select>
        </div>
        <br />
        <br />

        <div className="fr">
          <button onClick={close}>Cancel</button>
          <button onClick={add}>Add</button>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubscriptionModal;
