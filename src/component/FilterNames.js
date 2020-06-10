import React from "react";
import { useDispatch } from "react-redux";
import { FILTER_STUDENT_NAME } from "../redux/reducer";
import { filterStudentName } from "../redux/action";

const FilterNames = () => {
  const dispatch = useDispatch();

  const setFilter = filter => {
    dispatch(filterStudentName(filter));
  };

  return (
    <div className="FilterNames">
      <button onClick={() => setFilter({ a: "あ", b: "か" })}>あ</button>
      <button onClick={() => setFilter({ a: "か", b: "さ" })}>か</button>
      <button onClick={() => setFilter({ a: "さ", b: "た" })}>さ</button>
      <button onClick={() => setFilter({ a: "た", b: "な" })}>た</button>
      <button onClick={() => setFilter({ a: "な", b: "は" })}>な</button>
      <button onClick={() => setFilter({ a: "は", b: "ま" })}>は</button>
      <button onClick={() => setFilter({ a: "ま", b: "や" })}>ま</button>
      <button onClick={() => setFilter({ a: "や", b: "ら" })}>や</button>
      <button onClick={() => setFilter({ a: "ら", b: "わ" })}>ら</button>
      <button onClick={() => setFilter({ a: "わ", b: "ん" })}>わ</button>
      <button onClick={() => setFilter({ a: "あ", b: "ん" })}>全</button>
    </div>
  );
};

export default FilterNames;
