import short from "short-uuid";

export const _kinchan = {
  lastName_hiragana: "きん",
  firstName_hiragana: "ちにん",
  lastName_kanji: "金",
  firstName_kanji: "智仁",

  sex: "male",

  phoneNumber_mobile: "08043991100",
  phoneNumber_mobile_teacherNote: "夜以降に電話かけないでください、怒ります。",
  email: "kintininn@gmail.com",

  homeAddress: "千葉県千葉市中央区港町",
  homeAddress_teacherNote: "近日引越しする予定です　金ちゃん",

  soudanKirokuYoushi: "https://www.google.co.jp/",
  nyukaiMoushikomiSho: "https://www.google.co.jp/",

  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "student",
  uid: "mhaXdrZT4jP5T8vBxuvm75",
  id: "mhaXdrZT4jP5T8vBxuvm75",
};

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createStudentWith = payload => {
  const {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,
    // defaults, placed for future override
    createdBy = "lacoms",
    updatedBy = "lacoms",
  } = payload;

  if (
    !lastName_kanji &&
    !firstName_kanji &&
    !lastName_kanji &&
    !firstName_kanji
  ) {
    throw new Error("createStudentWith does not have enough payloads.");
  }

  const id = short.generate();
  return {
    lastName_kanji,
    firstName_kanji,
    lastName_hiragana,
    firstName_hiragana,

    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "student",
    uid: id,
    id,
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ─────────────────────────────────────────────────────────── オプション ───┐
export const createdBy = {
  lacoms: "lacoms",
  student: "student",
};

export const updatedBy = {
  lacoms: "lacoms",
  student: "student",
};

export const doctype = {
  student: "student",
};
// ────────────────────────────────────────────────────────────────────────┘
