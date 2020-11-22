import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterSubscriptions, filterMemberships } from "../redux/selector";
import "../style/_studentSubscriptionModule.scss";
import { $plan, createSubscriptionWith } from "../template/subscription";
import { cloudUpdate, cloudCreate } from "../firebase/firestore";
import { $status } from "../template/membership";
import { showAddSubscriptionModal } from "../redux/action";
import AddSubscriptionModal from "../modal/AddSubscriptionModal";
import { useState } from "react";
import OverrideSubscriptionModal from "../modal/OverrideSubscriptionModal";

const clone = require("rfdc")();

const StudentSubscriptionModule = () => {
  return (
    <div className="StudentSubscriptionModule">
      <LatestSubscription />
      <SubscriptionHistory />

      <AddSubscriptionModal />
    </div>
  );
};

export default StudentSubscriptionModule;

// ───────────────────────────────────────────────────────── components ───┐
const LatestSubscription = () => {
  const latest = useLatestSubscription();
  const previous = usePreviousSubscription();

  const { iso8601 = null, plan } = latest;
  const { iso8601: preIso8601, plan: prevPlan } = previous;

  const hasPlan = !!plan;
  const hasMembership = useHasMembership();
  const isUpToDate = checkIsUpToDate(iso8601);
  const isStillMember = useIsStillMember();

  if (!hasMembership) {
    return (
      <div className="LatestSubscription">
        <h2>会員情報がありません</h2>
        <h3>Please create Membership.</h3>
      </div>
    );
  } else if (hasPlan && isUpToDate && isStillMember) {
    return (
      <div className="LatestSubscription">
        <div className="display">
          <h2 className="ib">{localizePlan(plan)}</h2>
          {prevPlan && (
            <p className="ib">
              {moment(preIso8601).format("　← M月：") + localizePlan(prevPlan)}
            </p>
          )}
          <p>{moment(iso8601).format("M月")} プラン予定</p>
        </div>

        <ChangeSubscriptionButtonGroup />
        <p>※プラン変更の締め切りまで、残り{daysTillDeadLine(iso8601)}日</p>
      </div>
    );
  } else if (hasPlan && isUpToDate && !isStillMember) {
    return (
      <div className="LatestSubscription">
        <p>{moment(iso8601).format("YYYY年M月")}：</p>
        <div className="display">
          <h2>{localizePlan(plan)}</h2>
          <p>
            {plan === $plan.none
              ? ""
              : "⚠️生徒が既に退会されています。サブスクリプションを止めてください。"}
          </p>
        </div>
        <ChangeSubscriptionButtonGroup />
      </div>
    );
  } else if (hasPlan && !isUpToDate && !isStillMember) {
    if (plan !== $plan.none) {
      return (
        <div className="LatestSubscription">
          <h2>サブスクリプションが最新ではありません</h2>
          <p>下の更新ボタンをクリックしてください</p>
          <p className="subtitle">
            前回のサブスクリプション：{moment(iso8601).format("YYYY-MM　")}
            {localizePlan(plan)}
          </p>
          <ButtonRenewSubscription />
        </div>
      );
    } else {
      return (
        <div className="LatestSubscription">
          <h2>ご退会されました。</h2>
          <p>サブスクリプションも停止済みです　{localizePlan(plan)}</p>
          <p>iso8601</p>
        </div>
      );
    }
  } else if (hasPlan && !isUpToDate && isStillMember) {
    return (
      <div className="LatestSubscription">
        <h2>サブスクリプションが最新ではありません</h2>
        <p>下の更新ボタンをクリックしてください</p>
        <p className="subtitle">
          前回のサブスクリプション：{moment(iso8601).format("YYYY-MM　")}
          {localizePlan(plan)}
        </p>
        <ButtonRenewSubscription />
      </div>
    );
  } else if (!hasPlan) {
    return (
      <div className="LatestSubscription">
        <h2>まだサブスクリプションがありません</h2>
        <ButtonAddSubscription />
      </div>
    );
  }
};

const SubscriptionHistory = () => {
  const { id } = useParams();
  const subscriptions = useSelector(state => filterSubscriptions(state, id));

  const [modalPayload, setModalPayload] = useState({});

  const handleOverride = event => {
    setModalPayload({
      showOverride: true,
      id: event.target.dataset.id,
    });
  };

  return (
    <div className="SubscriptionHistory">
      <h3>Subscription History（サブスクリプション履歴）</h3>
      <table>
        <tbody>
          {subscriptions.map(subscription => {
            const { iso8601, plan, isPaid, isTicketed, id } = subscription;
            return (
              <tr key={id}>
                <td>{moment(iso8601).format("YYYY-MM")}</td>
                <td>{localizePlan(plan)}</td>
                <td>{isPaid ? "支払済" : "未払い"}</td>
                <td>{isTicketed ? "発券済" : "未発券"}</td>
                <td>
                  <button disabled>編集する</button>
                </td>
                <td>
                  <button
                    data-id={id}
                    onClick={handleOverride}
                    style={{ color: "red" }}
                  >
                    オーバーライド
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <OverrideSubscriptionModal
        modalPayload={modalPayload}
        setModalPayload={setModalPayload}
      />
    </div>
  );
};

const checkIsUpToDate = iso8601 => {
  if (iso8601 === undefined) {
    throw new Error("iso8601 must be provided");
  }

  const daysRemain = daysTillDeadLine(iso8601);

  if (daysRemain < 0) {
    return false;
  } else {
    return true;
  }
};

const daysTillDeadLine = iso8601 => {
  if (iso8601 === undefined) {
    throw new Error("iso8601 must be provided");
  }

  const deadline = 10;
  const daysRemain = iso8601
    ? moment("2020-08-31")
        .year(moment(iso8601).year())
        .month(moment(iso8601).month() - 1)
        .date(deadline)
        .diff(moment("2020-08-31"), "days")
    : null;

  return daysRemain;
};

export const useLatestSubscription = () => {
  const { id } = useParams();
  const subscriptions = useSelector(state => filterSubscriptions(state, id));
  const latestSubscription = subscriptions[subscriptions.length - 1] || {};

  return latestSubscription;
};

export const usePreviousSubscription = () => {
  const { id } = useParams();
  const subscriptions = useSelector(state => filterSubscriptions(state, id));
  const previousSubscription = subscriptions[subscriptions.length - 2] || {};

  return previousSubscription;
};

export const useLatestMembership = () => {
  const { id } = useParams();
  const memberships = useSelector(state => filterMemberships(state, id));
  const latestMembership = memberships[memberships.length - 1] || {};

  return latestMembership;
};

export const useHasMembership = () => {
  const latest = useLatestMembership();

  if (!!latest.status) {
    return true;
  } else {
    return false;
  }
};

export const useIsStillMember = () => {
  const latest = useLatestMembership();

  if (latest.status === $status.cancelled) {
    return false;
  } else if (!latest.status) {
    return false;
  } else {
    return true;
  }
};

const useShouldDisablePlanChange = btnType => {
  const latest = useLatestSubscription();

  if (!btnType) {
    throw new Error("button type must be provided");
  }

  switch (btnType) {
    case $plan.none:
      return latest.plan ? (latest.plan === $plan.none ? true : false) : true;
    case $plan.standard:
      return latest.plan
        ? latest.plan === $plan.standard
          ? true
          : false
        : true;
    case $plan.standardPlus:
      return latest.plan
        ? latest.plan === $plan.standardPlus
          ? true
          : false
        : true;
    case $plan.fast:
      return latest.plan ? (latest.plan === $plan.fast ? true : false) : true;
    case $plan.extremelyFast:
      return latest.plan
        ? latest.plan === $plan.extremelyFast
          ? true
          : false
        : true;
    default:
      throw new Error("undefined plan type");
  }
};

const useChangePlanTo = plan => {
  const latest = useLatestSubscription();
  const latestClone = clone(latest);

  if (!plan) {
    throw new Error("plan must be provided");
  }

  if (
    plan !== $plan.none &&
    plan !== $plan.standard &&
    plan !== $plan.standardPlus &&
    plan !== $plan.fast &&
    plan !== $plan.extremelyFast
  ) {
    throw new Error("undefined plan type");
  }

  return () => {
    latestClone.plan = plan;
    cloudUpdate(latestClone);
  };
};

export const localizePlan = (plan, option) => {
  switch (plan) {
    case $plan.none:
      return "Pause / Halt (授業料止め)";
    case $plan.standard:
      return "Standard（4）";
    case $plan.standardPlus:
      return "Standard Plus（6）";
    case $plan.fast:
      return "Fast（8）";
    case $plan.extremelyFast:
      return "Extremely Fast（12）";
    case undefined:
      return "no data";
    default:
      throw new Error("undefined plan type");
  }
};

const ButtonChangeSubscripton = props => {
  const { plan: typeOfPlan } = props;

  if (!typeOfPlan) {
    throw new Error("plan must be provided");
  }

  const disable = useShouldDisablePlanChange(typeOfPlan);
  const changePlan = useChangePlanTo(typeOfPlan);
  const localizedPlan = localizePlan(typeOfPlan);

  return (
    <button disabled={disable} onClick={changePlan}>
      {localizedPlan}
    </button>
  );
};

const ChangeSubscriptionButtonGroup = () => {
  return (
    <div className="ChangeSubscriptionButtonGroup">
      <ButtonChangeSubscripton plan={$plan.standard} />
      <ButtonChangeSubscripton plan={$plan.standardPlus} />
      <ButtonChangeSubscripton plan={$plan.fast} />
      <ButtonChangeSubscripton plan={$plan.extremelyFast} />
      <ButtonChangeSubscripton plan={$plan.none} />
    </div>
  );
};

const ButtonRenewSubscription = () => {
  const latest = useLatestSubscription();
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
    iso8601,
    plan,
  } = latest;

  const nextMonth = moment(iso8601).add(1, "month").format("YYYY-MM-DD");

  const renew = () => {
    const subscription = createSubscriptionWith({
      lastName_kanji,
      firstName_kanji,
      lastName_hiragana,
      firstName_hiragana,
      uid,
      iso8601: nextMonth,
      plan,
    });

    cloudCreate(subscription);
  };

  return <button onClick={renew}>Renew（更新）</button>;
};

const ButtonAddSubscription = () => {
  const dispatch = useDispatch();

  const add = () => {
    dispatch(showAddSubscriptionModal(true));
  };

  return <button onClick={add}>+ Add（プラン設定）</button>;
};
// ────────────────────────────────────────────────────────────────────────┘
