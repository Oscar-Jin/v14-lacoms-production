// ────────────────────────────────────────────────── (action type) 定数 ───┐
export const SYNC_STUDENTS = "SYNC_STUDENTS";
export const SYNC_MEMBERSHIPS = "SYNC_MEMBERSHIPS";
export const SYNC_SUBSCRIPTIONS = "SYNC_SUBSCRIPTIONS";
export const SYNC_TICKETS = "SYNC_TICKETS";
export const SYNC_RESERVATIONS = "SYNC_RESERVATIONS";
export const SYNC_PAYMENTS = "SYNC_PAYMENTS";

export const UPDATE_USER = "UPDATE_USER";

export const FILTER_STUDENT_NAME = "FILTER_STUDENT_NAME";
export const FILTER_STUDENT_MEMBERSHIP = "FILTER_STUDENT_MEMBERSHIP";

export const SHOW_ADD_STUDENT_MODAL = "SHOW_ADD_STUDENT_MODAL";
// ────────────────────────────────────────────────────────────────────────┘

// ────────────────────────────────────────────────────── (doctype) 定数 ───┐
const student = "student";
const membership = "membership";
const subscription = "subscription";
const ticket = "ticket";
const reservation = "reservation";
const payment = "payment";
// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────────────── 変換 ───┐
export const createAction = doctype => {
  switch (doctype) {
    case student:
      return SYNC_STUDENTS;
    case membership:
      return SYNC_MEMBERSHIPS;
    case subscription:
      return SYNC_SUBSCRIPTIONS;
    case ticket:
      return SYNC_TICKETS;
    case reservation:
      return SYNC_RESERVATIONS;
    case payment:
      return SYNC_PAYMENTS;
    default:
      throw new Error("undefined doctype");
  }
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── クラウド ───┐
export const students = (state = [], { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case SYNC_STUDENTS:
      return [...payload];
    default:
      return state;
  }
};

export const memberships = (state = [], { type, payload }) => {
  switch (type) {
    case SYNC_MEMBERSHIPS:
      return [...payload];
    default:
      return state;
  }
};

export const subscriptions = (state = [], { type, payload }) => {
  switch (type) {
    case SYNC_SUBSCRIPTIONS:
      return [...payload];
    default:
      return state;
  }
};

export const tickets = (state = [], { type, payload }) => {
  switch (type) {
    case SYNC_TICKETS:
      return [...payload];
    default:
      return state;
  }
};

export const reservations = (state = [], { type, payload }) => {
  switch (type) {
    case SYNC_RESERVATIONS:
      return [...payload];
    default:
      return state;
  }
};

export const payments = (state = [], { type, payload }) => {
  switch (type) {
    case SYNC_PAYMENTS:
      return [...payload];
    default:
      return state;
  }
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── ローカル ───┐
export const user = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_USER:
      return payload;
    default:
      return state;
  }
};

export const filter = (
  state = {
    studentName: { a: "あ", b: "か" },
    studentMembership: null,
  },
  { type, payload }
) => {
  switch (type) {
    case FILTER_STUDENT_NAME:
      return { ...state, studentName: payload };
    case FILTER_STUDENT_MEMBERSHIP:
      return { ...state, studentMembership: payload };
    default:
      return state;
  }
};

export const modal = (
  state = {
    showAddStudent: false,
  },
  { type, payload }
) => {
  switch (type) {
    case SHOW_ADD_STUDENT_MODAL:
      return { ...state, showAddStudent: payload };
    default:
      return state;
  }
};
// ────────────────────────────────────────────────────────────────────────┘
