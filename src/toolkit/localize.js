import { $status } from "../template/membership";

const male = "male";
const female = "female";
const other = "other";

const long = "long";

export const localizeSex = (sex, option = long) => {
  switch (sex) {
    case male:
      return option === long ? "男性" : "男";
    case female:
      return option === long ? "女性" : "女";
    case other:
      return option === long ? "その他" : "他";
    default:
      return null;
  }
};

export const localizeStatus = status => {
  switch (status) {
    case $status.active:
      return "Active Member（会員）";
    case $status.paused:
      return "Paused（休会）";
    case $status.cancelled:
      return "Cancelled（退会）";
    default:
      return "???（不明）";
  }
};
