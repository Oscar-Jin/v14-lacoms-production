import moment from "moment";
import short from "short-uuid";

// supposed to be collection("classes").doc("class"), but since class is a reserved keyword in JS, lessons > lesson is used instead.

// ─────────────────────────────────────────────────────────── オプション ───┐
export const $lessonName = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  GHI: "GHI",

  L1: "L1",
  L2: "L2",
  L3: "L3",
  L4: "L4",
  L5: "L5",

  ONLINE_E: "ONLINE_E",
  ONLINE_F: "ONLINE_F",
  ONLINE_GHI: "ONLINE_GHI",
};

export const $instructorName = {
  水野: "水野",
  高嶋: "高嶋",
  向井: "向井",
  金村: "金村",
  遠藤: "遠藤",
  呉: "呉",
  坂井: "坂井",
  神崎: "神崎",
  赤嶺: "赤嶺",
  金丸: "金丸",
  日永: "日永",
  鈴木: "鈴木",
  金ちゃん: "金ちゃん",
  未定: "未定",
};
// ────────────────────────────────────────────────────────────────────────┘

export const lessonSampleGHI = {
  // time
  year: 2020,
  month: 7,
  date: 6,
  hour: 13,
  minute: 0,

  iso8601: moment("2020-07").format("YYYY-MM-DD"),
  timeString: moment().hour(13).minute(0).format("HH:mm"),

  // lesson
  lessonName: $lessonName.GHI,
  instructorName: $instructorName.神崎,
  capacity: 3,

  reservedBy: [],

  // meta info
  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "lesson",
  id: short.generate(),
};

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createLessonWith = payload => {
  const {
    iso8601,
    timeString,
    lessonName,
    instructorName,
    capacity,
    // defaults, can be overwritten
    createdBy = "lacoms",
    updatedBy = "lacoms",
  } = payload;

  if (!iso8601 || !timeString || !lessonName || !instructorName || !capacity) {
    throw new Error(
      "createLessonWith did not recieve all the properties it requires"
    );
  }

  const datetime = moment(iso8601 + " " + timeString);

  return {
    // time
    year: moment(datetime).year(),
    month: moment(datetime).month() + 1,
    date: moment(datetime).date(),
    hour: moment(datetime).hour(),
    minute: moment(datetime).minute(),
    iso8601,
    timeString,
    // lesson
    lessonName,
    instructorName,
    capacity,
    reservedBy: [],
    // meta info
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "lesson",
    id: short.generate(),
  };
};
// ────────────────────────────────────────────────────────────────────────┘
