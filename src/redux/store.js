import { createStore, combineReducers } from "redux";
import {
  // クラウド
  students,
  memberships,
  subscriptions,
  tickets,
  reservations,
  payments,
  // ローカル
  user,
  filter,
  modal,
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
    filter,
    modal,
  })
);

export default store;
