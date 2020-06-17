import moment from "moment";
import short from "short-uuid";
import { $lessonName, $instructorName } from "./lesson";

// ─────────────────────────────────────────────────── スケジュールテンプレ ───┐
export const scheduleTemplate1 = {
  // time
  hour: 13,
  minute: 0,
  timeString: moment().hour(13).minute(0).format("HH:mm"),
  // lesson
  lessonName: $lessonName.GHI,
  instructorName: $instructorName.神崎,
  capacity: 3,
  regularsOnly: true,
  // meta
  id: short.generate(),
};

// ────────────────────────────────────────────────────────────────────────┘

export const julyTimetable = {
  // date
  year: 2020,
  month: 7,
  iso8601: moment("2020-07").format("YYYY-MM-DD"),

  // weekly schedule
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],

  excludes: [
    // { date: 6, reason: "校内改修工事のため" },
    // { date: 13, reason: "バーベーキューのため" },
  ],

  isGenerated: false,

  // meta info
  createdOn: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  createdBy: "lacoms",
  updatedBy: "lacoms",
  doctype: "timetable",
  id: short.generate(),
};

// ──────────────────────────────────────────────────────────────── 生成 ───┐
export const createTimetableWith = payload => {
  const {
    iso8601,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    // defaults, can be overwritten
    excludes = [],
    createdBy = "lacoms",
    updatedBy = "lacoms",
  } = payload;

  if (
    !iso8601 ||
    !monday ||
    !tuesday ||
    !wednesday ||
    !thursday ||
    !friday ||
    !saturday ||
    !sunday
  ) {
    throw new Error(
      "createTimetableWith did not receive all the properties it requires"
    );
  }

  return {
    // date
    year: moment(iso8601).year(),
    month: moment(iso8601).month() + 1,
    iso8601,

    // weekly schedule
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,

    excludes,

    isGenerated: false,
    // meta info
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    createdBy,
    updatedBy,
    doctype: "timetable",
    id: short.generate(),
  };
};

export const createScheduleWith = payload => {
  const {
    timeString,
    lessonName,
    instructorName,
    capacity,
    regularsOnly,
  } = payload;

  if (
    !timeString ||
    !lessonName ||
    !instructorName ||
    capacity === undefined ||
    regularsOnly === undefined
  ) {
    throw new Error("payloads must be complete");
  }

  return {
    // time
    hour: moment(moment().format("YYYY-MM-DD") + " " + timeString).hour(),
    minute: moment(moment().format("YYYY-MM-DD") + " " + timeString).minute(),
    timeString,
    // lesson
    lessonName,
    instructorName,
    capacity,
    regularsOnly,
    // meta
    id: short.generate(),
  };
};
// ────────────────────────────────────────────────────────────────────────┘
