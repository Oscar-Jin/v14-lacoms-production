export const SYNC_STUDENTS = "SYNC_STUDENTS";
export const SYNC_MEMBERSHIPS = "SYNC_MEMBERSHIPS";
export const SYNC_SUBSCRIPTIONS = "SYNC_SUBSCRIPTIONS";
export const SYNC_RESERVATIONS = "SYNC_RESERVATIONS";
export const SYNC_TICKETS = "SYNC_TICKETS";

// export const ADD_STUDENT = "ADD_STUDENT";
// export const ADD_MEMBERSHIP = "ADD_MEMBERSHIP";
// export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
// export const ADD_RESERVATION = "ADD_RESERVATION";
// export const ADD_TICKET = "ADD_TICKET";

// export const UPDATE_STUDENT = "UPDATE_STUDENT";
// export const UPDATE_MEMBERSHIP = "UPDATE_MEMBERSHIP";
// export const UPDATE_SUBSCRIPTION = "UPDATE_SUBSCRIPTION";
// export const UPDATE_RESERVATION = "UPDATE_RESERVATION";
// export const UPDATE_TICKET = "UPDATE_TICKET";

// export const REMOVE_STUDENT = "REMOVE_STUDENT";
// export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";
// export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";
// export const REMOVE_RESERVATION = "REMOVE_RESERVATION";
// export const REMOVE_TICKET = "REMOVE_TICKET";

export const students = (state = [], { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case SYNC_STUDENTS:
      return [...payload];
    default:
      return state;
  }
};
