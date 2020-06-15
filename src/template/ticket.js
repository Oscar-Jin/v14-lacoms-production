import moment from "moment";
import short from "short-uuid";

// ─────────────────────────────────────────────────────────── オプション ───┐
export const $type = {
  singlePurchase: "singlePurchase",
  subscriptionBundle: "subscriptionBundle",
  pastUnused: "pastUnused", // <-- for backwards compatibility
};

// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── ヘルパー ───┐
export const calcExpirationDate = iso8601 => {
  const momth = moment(iso8601).month();
  return momth < 4
    ? moment().month(8).date(1).format("YYYY-MM-DD")
    : momth < 8
    ? moment().add(1, "y").month(0).date(1).format("YYYY-MM-DD")
    : moment().add(1, "y").month(4).date(1).format("YYYY-MM-DD");
};
// ────────────────────────────────────────────────────────────────────────┘

export const kinchanTicket = {
  // student info
  lastName_hiragana: "きん",
  firstName_hiragana: "ちにん",
  lastName_kanji: "金",
  firstName_kanji: "智仁",
  uid: "kinchan",

  // ticket
  year: 2020,
  month: 5,
  iso8601: moment("2020-05").format("YYYY-MM-DD"),
  type: $type.singlePurchase,

  willExpire: true,
  expirationDate: calcExpirationDate("2020-05"),

  usedOn: null,

  // meta info
  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "ticket",
  id: short.generate(),
};

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createTicketWith = payload => {
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,
    iso8601,
    type,
    // defaults, can be overwritten.
    willExpire = true,
    usedOn = null,
    createdBy = "lacoms",
    updatedBy = "lacoms",
  } = payload;

  if (
    !lastName_kanji &&
    !firstName_kanji &&
    !lastName_hiragana &&
    !firstName_hiragana &&
    !uid &&
    !iso8601 &&
    !type &&
    !willExpire &&
    !usedOn &&
    !createdBy &&
    !updatedBy
  ) {
    throw new Error(
      "createTicketWith did not receive all the properties it requires"
    );
  }

  const ticket = {
    // student info
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    uid,

    // ticket
    year: moment(iso8601).year(),
    month: moment(iso8601).month() + 1,
    iso8601,
    type,

    willExpire,
    expirationDate: null,

    usedOn,

    // meta info
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "ticket",
    id: short.generate(),
  };

  if (willExpire) {
    ticket.expirationDate = calcExpirationDate(iso8601);
  }

  return ticket;
};

// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────── ローカライザー ───┐
export const localizeType = type => {
  if (type === undefined) {
    throw new Error("type must be provided");
  }

  switch (type) {
    case $type.singlePurchase:
      return "きっぷ（補講）";
    case $type.subscriptionBundle:
      return "定期券（プラン）";
    case $type.pastUnused:
      return "乗車整理券（システム移行前の未消化分）";
    default:
      throw new Error("type is not defined");
  }
};
// ────────────────────────────────────────────────────────────────────────┘
