import {
  UPDATE_USER,
  FILTER_STUDENT_NAME,
  FILTER_STUDENT_MEMBERSHIP,
  SHOW_ADD_STUDENT_MODAL,
  SHOW_STUDENT_REMOVE_BUTTON,
  TOGGLE_EDIT_STUDENT_MODAL,
  SHOW_ADD_MEMBERSHIP_MODAL,
  SHOW_ADD_SUBSCRIPTION_MODAL,
} from "./reducer";

// ──────────────────────────────────────────────────────── エラーチェック ───┐
const check = payload => {
  if (payload === undefined) {
    throw new Error("you must provide a payload");
  }
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── ユーザー ───┐
export const updateUser = payload => {
  check(payload);
  return {
    type: UPDATE_USER,
    payload,
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ─────────────────────────────────────────────────────────── フィルター ───┐
export const filterStudentName = payload => {
  check(payload);
  return {
    type: FILTER_STUDENT_NAME,
    payload,
  };
};

export const filterStudentMembership = payload => {
  check(payload);
  return {
    type: FILTER_STUDENT_MEMBERSHIP,
    payload,
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ────────────────────────────────────────────────────────────── ショー ───┐
export const showAddStudentModal = payload => {
  check(payload);
  return {
    type: SHOW_ADD_STUDENT_MODAL,
    payload,
  };
};

export const showAddMembershipModal = payload => {
  check(payload);
  return {
    type: SHOW_ADD_MEMBERSHIP_MODAL,
    payload,
  };
};

export const showAddSubscriptionModal = payload => {
  check(payload);
  return {
    type: SHOW_ADD_SUBSCRIPTION_MODAL,
    payload,
  };
};

export const toggleEditStudentModal = payload => {
  check(payload);
  return {
    type: TOGGLE_EDIT_STUDENT_MODAL,
    payload,
  };
};

export const showStudentRemove = payload => {
  check(payload);
  return {
    type: SHOW_STUDENT_REMOVE_BUTTON,
    payload,
  };
};

// ────────────────────────────────────────────────────────────────────────┘
