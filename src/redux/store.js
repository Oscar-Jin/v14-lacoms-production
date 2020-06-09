import { createStore, combineReducers } from "redux";
import {
  students,
  memberships,
  subscriptions,
  tickets,
  reservations,
  payments,
} from "./reducer";

const store = createStore(
  combineReducers({
    students,
    memberships,
    subscriptions,
    tickets,
    reservations,
    payments,
  })
);

export default store;
