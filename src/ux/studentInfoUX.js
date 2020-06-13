import React from "react";
import moment from "moment";
import useCheckoutStudent from "../hook/useCheckoutStudent";
import { localizeSex } from "../toolkit/localize";

// ─────────────────────────────────────────────────────────── フィールド ───┐
export const $dataType = {
  text: "text",
  sex: "sex",
  birthdate: "birthdate",
  phoneNumber: "phoneNumber",
  email: "email",
  url: "url",
  notes: "notes",
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
      case $dataType.birthdate:
        const iso8601 = student[referenceKey];
        const birthdate = iso8601
          ? moment(iso8601).format("YYYY年MM月DD日")
          : "";
        return <span className="birthdate">{birthdate}</span>;
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
      case $dataType.notes:
        return <p className="notes">{student[referenceKey]}</p>;

      default:
        console.warn("unefined dataType. will default to text");
        return <span className="text">{student[referenceKey]}</span>;
    }
  };
};

export const switchInputType = (dataType, subject, updateSubject) => {
  switch (dataType) {
    case $dataType.text:
      return (
        <input
          type="text"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        />
      );
    case $dataType.sex:
      return (
        <select value={subject} autoComplete="off" onChange={updateSubject}>
          <option value={"male"}>male (男性)</option>
          <option value={"female"}>female (女性)</option>
          <option value={"other"}>other (その他)</option>
        </select>
      );
    case $dataType.birthdate:
      return (
        <input
          type="date"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        />
      );
    case $dataType.phoneNumber:
      return (
        <input
          type="tel"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        />
      );
    case $dataType.email:
      return (
        <input
          type="email"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        />
      );
    case $dataType.url:
      return (
        <input
          type="url"
          value={subject}
          autoComplete="off"
          placeholder="https://"
          onChange={updateSubject}
        />
      );
    case $dataType.notes:
      return (
        <textarea
          cols="30"
          rows="5"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        ></textarea>
      );

    default:
      return (
        <input
          type="text"
          value={subject}
          autoComplete="off"
          onChange={updateSubject}
        />
      );
  }
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
    title: "誕生日",
    subTitle: "",
    referenceKey: "birthdate",
    noteReferenceKey: "birthdate_teacherNote",
    dataType: $dataType.birthdate,
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
    subTitle: "",
    referenceKey: "soudanKirokuYoushi",
    noteReferenceKey: "soudanKirokuYoushi_teacherNote",
    dataType: $dataType.url,
  },
  {
    title: "入会申込書",
    subTitle: "",
    referenceKey: "nyukaiMoushikomiSho",
    noteReferenceKey: "nyukaiMoushikomiSho_teacherNote",
    dataType: $dataType.url,
  },
  {
    title: "その他",
    subTitle: "メモ",
    referenceKey: "notes",
    noteReferenceKey: "",
    dataType: $dataType.notes,
  },
];
