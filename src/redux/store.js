import { createStore, combineReducers } from "redux";
import {
  students,
  memberships,
  subscriptions,
  tickets,
  reservations,
  payments,
  user,
} from "./reducer";

const store = createStore(
  combineReducers({
    // クラウド
    students,
    memberships,
    subscriptions,
    tickets,
    reservations,
    payments,
    // ローカル
    user,
  })
);

export default store;
