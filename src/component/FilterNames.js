import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterStudentName } from "../redux/action";
import { selectStudentFilter } from "../redux/selector";

const ilblock = { display: "inline-block" };

const FilterNames = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectStudentFilter);

  const setFilter = filter => {
    dispatch(filterStudentName(filter));
  };

  return (
    <div className="FilterNames" style={ilblock}>
      <button
        onClick={() => setFilter({ a: "あ", b: "か" })}
        disabled={filter.a === "あ" && filter.b === "か"}
      >
        あ
      </button>
      <button
        onClick={() => setFilter({ a: "か", b: "さ" })}
        disabled={filter.a === "か"}
      >
        か
      </button>
      <button
        onClick={() => setFilter({ a: "さ", b: "た" })}
        disabled={filter.a === "さ"}
      >
        さ
      </button>
      <button
        onClick={() => setFilter({ a: "た", b: "な" })}
        disabled={filter.a === "た"}
      >
        た
      </button>
      <button
        onClick={() => setFilter({ a: "な", b: "は" })}
        disabled={filter.a === "な"}
      >
        な
      </button>
      <button
        onClick={() => setFilter({ a: "は", b: "ま" })}
        disabled={filter.a === "は"}
      >
        は
      </button>
      <button
        onClick={() => setFilter({ a: "ま", b: "や" })}
        disabled={filter.a === "ま"}
      >
        ま
      </button>
      <button
        onClick={() => setFilter({ a: "や", b: "ら" })}
        disabled={filter.a === "や"}
      >
        や
      </button>
      <button
        onClick={() => setFilter({ a: "ら", b: "わ" })}
        disabled={filter.a === "ら"}
      >
        ら
      </button>
      <button
        onClick={() => setFilter({ a: "わ", b: "ん" })}
        disabled={filter.a === "わ"}
      >
        わ
      </button>
      <button
        onClick={() => setFilter({ a: "あ", b: "ん" })}
        disabled={filter.a === "あ" && filter.b === "ん"}
      >
        全
      </button>
    </div>
  );
};

export default FilterNames;
