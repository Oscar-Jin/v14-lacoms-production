import React from "react";
import useCheckoutStudent from "../hook/useCheckoutStudent";
import { localizeSex } from "../toolkit/localize";

// ─────────────────────────────────────────────────────────── フィールド ───┐
export const $dataType = {
  text: "text",
  sex: "sex",
  phoneNumber: "phoneNumber",
  email: "email",
  url: "url",
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────── コンバーター ───┐
export const useStudenInfoTypeConverter = () => {
  const [student] = useCheckoutStudent();

  return ux => {
    if (!ux) {
      throw new Error("you must privide ux argument");
    }

    const { referenceKey, dataType } = ux;

    switch (dataType) {
      case $dataType.text:
        return <span className="text">{student[referenceKey]}</span>;
      case $dataType.sex:
        return (
          <span className="sex">{localizeSex(student[referenceKey])}</span>
        );
      case $dataType.phoneNumber:
        return <span className="phoneNumber">{student[referenceKey]}</span>;
      case $dataType.email:
        return (
          <a href={"mailto:" + student[referenceKey]}>
            {student[referenceKey]}
          </a>
        );
      case $dataType.url:
        return (
          <a
            href={student[referenceKey]}
            rel="noopener noreferrer"
            target="_blank"
          >
            {student[referenceKey]}
          </a>
        );
      default:
        console.warn("unefined dataType. will default to text");
        return <span className="text">{student[referenceKey]}</span>;
    }
  };
};
// ────────────────────────────────────────────────────────────────────────┘

export const studentInfoUX = [
  {
    title: "姓",
    subTitle: "漢字",
    referenceKey: "lastName_kanji",
    noteReferenceKey: "lastName_kanji_teacherNote",
    dataType: $dataType.text,
    readOnly: true,
  },
  {
    title: "名",
    subTitle: "漢字",
    referenceKey: "firstName_kanji",
    noteReferenceKey: "firstName_kanji_teacherNote",
    dataType: $dataType.text,
    readOnly: true,
  },
  {
    title: "姓",
    subTitle: "ひらがな",
    referenceKey: "lastName_hiragana",
    noteReferenceKey: "lastName_hiragana_teacherNote",
    dataType: $dataType.text,
    readOnly: true,
  },
  {
    title: "名",
    subTitle: "ひらがな",
    referenceKey: "firstName_hiragana",
    noteReferenceKey: "firstName_hiragana_teacherNote",
    dataType: $dataType.text,
    readOnly: true,
  },
  {
    title: "性別",
    subTitle: "",
    referenceKey: "sex",
    noteReferenceKey: "sex_teacherNote",
    dataType: $dataType.sex,
  },
  {
    title: "電話",
    subTitle: "携帯",
    referenceKey: "phoneNumber_mobile",
    noteReferenceKey: "phoneNumber_mobile_teacherNote",
    dataType: $dataType.phoneNumber,
  },
  {
    title: "電話",
    subTitle: "自宅",
    referenceKey: "phoneNumber_home",
    noteReferenceKey: "phoneNumber_home_teacherNote",
    dataType: $dataType.phoneNumber,
  },
  {
    title: "電話",
    subTitle: "保護者",
    referenceKey: "phoneNumber_parent",
    noteReferenceKey: "phoneNumber_parent_teacherNote",
    dataType: $dataType.phoneNumber,
  },
  {
    title: "メール",
    subTitle: "",
    referenceKey: "email",
    noteReferenceKey: "email_teacherNote",
    dataType: $dataType.email,
  },
  {
    title: "メール",
    subTitle: "保護者",
    referenceKey: "email_parent",
    noteReferenceKey: "email_parent_teacherNote",
    dataType: $dataType.email,
  },
  {
    title: "住所",
    subTitle: "",
    referenceKey: "homeAddress",
    noteReferenceKey: "homeAddress_teacherNote",
    dataType: $dataType.text,
  },
  {
    title: "相談記録用紙",
    subTitle: "リンク",
    referenceKey: "soudanKirokuYoushi",
    noteReferenceKey: "soudanKirokuYoushi_teacherNote",
    dataType: $dataType.url,
  },
  {
    title: "入会申込書",
    subTitle: "リンク",
    referenceKey: "nyukaiMoushikomiSho",
    noteReferenceKey: "nyukaiMoushikomiSho_teacherNote",
    dataType: $dataType.url,
  },
];
