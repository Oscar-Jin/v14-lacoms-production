// ──────────────────────────────────────────────────────────────── 定数 ───┐
export const SYNC_STUDENTS = "SYNC_STUDENTS";
export const SYNC_MEMBERSHIPS = "SYNC_MEMBERSHIPS";
export const SYNC_SUBSCRIPTIONS = "SYNC_SUBSCRIPTIONS";
export const SYNC_TICKETS = "SYNC_TICKETS";
export const SYNC_RESERVATIONS = "SYNC_RESERVATIONS";
export const SYNC_PAYMENTS = "SYNC_PAYMENTS";
// ────────────────────────────────────────────────────────────────────────┘

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
