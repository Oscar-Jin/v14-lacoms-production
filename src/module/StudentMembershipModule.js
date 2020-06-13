import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { filterMemberships } from "../redux/selector";
import { useParams } from "react-router-dom";
import last from "lodash/last";

import "../style/_studentMembershipModule.scss";
import { showAddMembershipModal } from "../redux/action";
import AddMembershipModal from "../modal/AddMembershipModal";
import ButtonActivateMembership from "../button/MembershipActivateButton";
import ButtonPauseMembership from "../button/MembershipPauseButton";
import { localizeStatus } from "../toolkit/localize";
import ButtonCancelMembership from "../button/MembershipCancelButton";

const StudentMembershipModule = () => {
  const { id } = useParams();
  const memberships = useSelector(state => filterMemberships(state, id));
  const initial = memberships.find(membership => membership.isInitial === true);
  const latest = last(memberships) || {};
  const diffInMonth = latest.iso8601
    ? moment().diff(moment(latest.iso8601), "months")
    : null;

  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(showAddMembershipModal(true));
  };

  return (
    <div className="StudentMembershipModule">
      {latest.id ? (
        diffInMonth ? (
          <div className="MembershipCard">
            <h2>Membership is Outdated</h2>
            <p>Please Renew the membership by clicking the add button below</p>
            <p>
              {moment(latest.iso8601).format("M月ステータス：")}{" "}
              {localizeStatus(latest.status)}
            </p>
          </div>
        ) : (
          <>
            <div className="MembershipCard">
              <h2> {localizeStatus(latest.status)}</h2>
              <span>{moment(latest.iso8601).format("M月現在")}</span>
              <div>
                <span>
                  since :{" "}
                  {initial
                    ? moment(initial.iso8601).format("YYYY-MM")
                    : "unknown"}
                </span>
                <span>{latest.isInitial ? "新入生🌸" : ""}</span>
              </div>
              <p>ID: {latest.uid}</p>
            </div>
            <br />
            <ButtonActivateMembership />
            <ButtonPauseMembership />
            <ButtonCancelMembership />
            <p className="subtitle">
              ステータスを変更した場合、サブスクリプション（授業料）の変更も必ず行ってください。
            </p>
          </>
        )
      ) : (
        <div />
      )}

      {memberships.length ? (
        <div className="TableMembershipHistory">
          <h3>Past Memberships（会員履歴）</h3>
          <table>
            <tbody>
              {memberships.map(membership => {
                const { iso8601, status, isInitial, id } = membership;
                return (
                  <tr key={id}>
                    <td>{moment(iso8601).format("YYYY-MM")}</td>
                    <td>{localizeStatus(status)}</td>
                    <td>{isInitial ? "ご入会日🌸" : "　"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div />
      )}

      <button onClick={handleAdd}>+ Add</button>
      {memberships.length ? (
        <p className="subtitle">
          *If you think you screwed up, please do not hesitate to ask kinchan
          for help. If kinchan has departed already, now I assure you you
          screwed up real bad :)
        </p>
      ) : (
        <div />
      )}

      <AddMembershipModal />
    </div>
  );
};

export default StudentMembershipModule;
