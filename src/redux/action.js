import {
  UPDATE_USER,
  FILTER_STUDENT_NAME,
  FILTER_STUDENT_MEMBERSHIP,
  SHOW_ADD_STUDENT_MODAL,
} from "./reducer";

// ───────────────────────────────────────────────────────────── ユーザー ───┐
export const updateUser = payload => {
  if (payload === undefined) {
    throw new Error("you must provide a payload");
  }
  return {
    type: UPDATE_USER,
    payload,
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ─────────────────────────────────────────────────────────── フィルター ───┐
export const filterStudentName = payload => {
  if (payload === undefined) {
    throw new Error("you must provide a payload");
  }
  return {
    type: FILTER_STUDENT_NAME,
    payload,
  };
};

export const filterStudentMembership = payload => {
  if (payload === undefined) {
    throw new Error("you must provide a payload");
  }
  return {
    type: FILTER_STUDENT_MEMBERSHIP,
    payload,
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── モーダル ───┐
export const showAddStudentModal = payload => {
  if (payload === undefined) {
    throw new Error("you must provide a payload");
  }
  return {
    type: SHOW_ADD_STUDENT_MODAL,
    payload,
  };
};

// ────────────────────────────────────────────────────────────────────────┘
