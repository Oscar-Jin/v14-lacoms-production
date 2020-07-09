import moment from "moment";
import short from "short-uuid";

export const $memoType = {
  heavensMemoPad: "heavensMemoPad",
};

export const heavensMemoPadSample = {
  memoType: "heavensMemoPad",
  content: "It's party time",

  year: 2020,
  month: 7,
  date: 10,
  iso8601: moment("2020-07-10").format("YYYY-MM-DD"),

  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "memo",
  id: short.generate(),
};

export function createHeavensMemo(iso8601, content) {
  return {
    memoType: $memoType.heavensMemoPad,
    content: content,

    year: moment(iso8601).year(),
    month: moment(iso8601).month() + 1,
    date: moment(iso8601).date(),
    iso8601: iso8601,

    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy: "lacoms",
    updatedBy: "lacoms",
    doctype: "memo",
    id: short.generate(),
  };
}
