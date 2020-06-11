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
