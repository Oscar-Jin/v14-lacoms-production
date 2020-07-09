import { createStore, combineReducers } from "redux";
import {
  // クラウド
  students,
  memberships,
  subscriptions,
  tickets,
  reservations,
  payments,
  timetables,
  lessons,
  memos,
  // ローカル
  user,
  filter,
  show,
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
    timetables,
    lessons,
    memos,
    // ローカル
    user,
    filter,
    show,
  })
);

export default store;
