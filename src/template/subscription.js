import moment from "moment";
import short from "short-uuid";

// ─────────────────────────────────────────────────────────── オプション ───┐
export const $plan = {
  none: "none",
  standard: "standard",
  standardPlus: "standardPlus",
  fast: "fast",
  extremelyFast: "extremelyFast",
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── サンプル ───┐
export const kinchanSubscription = {
  // student info
  lastName_hiragana: "きん",
  firstName_hiragana: "ちにん",
  lastName_kanji: "金",
  firstName_kanji: "智仁",
  uid: "kinchan",

  // subscription
  year: 2020,
  month: 5,
  iso8601: moment("2020-05").format("YYYY-MM-DD"),
  plan: $plan.standard,
  isPaid: false,
  isTicketed: false,

  // meta info
  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "subscription",
  id: short.generate(),
};
// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createSubscriptionWith = payload => {
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
    iso8601,
    plan,
    // defaults, can be overwritten.
    isPaid = false,
    isTicketed = false,
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
    !plan
  ) {
    throw new Error(
      "createSubscriptionWith did not receive all the properties it requires"
    );
  }

  return {
    // student info
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,

    // subscription
    year: moment(iso8601).year(),
    month: moment(iso8601).month() + 1,
    iso8601,
    plan,
    isPaid,
    isTicketed,

    // meta info
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "subscription",
    id: short.generate(),
  };
};
// ────────────────────────────────────────────────────────────────────────┘
