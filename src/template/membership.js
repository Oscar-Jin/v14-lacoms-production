import moment from "moment";
import short from "short-uuid";

// ─────────────────────────────────────────────────────────── オプション ───┐
export const $status = {
  active: "active",
  paused: "paused",
  cancelled: "cancelled",
};
// ────────────────────────────────────────────────────────────────────────┘

export const kinchanMembership = {
  // student info
  lastName_hiragana: "きん",
  firstName_hiragana: "ちにん",
  lastName_kanji: "金",
  firstName_kanji: "智仁",
  uid: "kinchan",

  // membership
  year: 2020,
  month: 4,
  iso8601: moment("2020-04").format("YYYY-MM-DD"),
  status: $status.active,
  isInitial: true,

  // meta info
  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "membership",
  id: short.generate(),
};

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createMembershipWith = payload => {
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
    iso8601,
    status,
    // defaults, placed for override
    isInitial = false,
    createdBy = "lacoms",
    updatedBy = "lacoms",
  } = payload;

  if (
    !lastName_kanji ||
    !firstName_kanji ||
    !lastName_hiragana ||
    !firstName_hiragana ||
    !uid ||
    !iso8601 ||
    !status
  ) {
    throw new Error(
      "createMembership does not have enough payload or cannot find student."
    );
  }

  return {
    // student info
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
    // membership
    year: moment(iso8601).year(),
    month: moment(iso8601).month() + 1,
    iso8601,
    status,
    isInitial,
    // meta info
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "membership",
    id: short.generate(),
  };
};
// ────────────────────────────────────────────────────────────────────────┘
