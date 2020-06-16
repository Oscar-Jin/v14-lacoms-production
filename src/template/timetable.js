import moment from "moment";
import short from "short-uuid";

// ─────────────────────────────────────────────────────────── オプション ───┐

// ────────────────────────────────────────────────────────────────────────┘

const julyTimetable = {
  // timetable
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

  excludes: [],

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
    excludes,
  } = payload;
};
// ────────────────────────────────────────────────────────────────────────┘
