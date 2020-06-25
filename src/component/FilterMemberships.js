import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMembershipsFilter } from "../redux/selector";
import { useState } from "react";
import { useEffect } from "react";
import { FILTER_STUDENT_MEMBERSHIP } from "../redux/reducer";

const FilterMemberships = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(useSelector(selectMembershipsFilter));

  useEffect(() => {
    dispatch({
      type: FILTER_STUDENT_MEMBERSHIP,
      payload: filter,
    });
  }, [filter, dispatch]);

  return (
    <div
      className="FilterMemberships"
      style={{
        marginLeft: "1rem",
        border: "1px solid whitesmoke",
        padding: "3px",
        display: "inline-block",
      }}
    >
      <form>
        <input
          type="radio"
          name="filter"
          id="active"
          checked={filter === "active"}
          onChange={e => setFilter(e.target.id)}
        />
        <label htmlFor="active">会員</label>
        <input
          type="radio"
          name="filter"
          id="paused"
          checked={filter === "paused"}
          onChange={e => setFilter(e.target.id)}
        />
        <label htmlFor="paused">休会</label>
        <input
          type="radio"
          name="filter"
          id="cancelled"
          checked={filter === "cancelled"}
          onChange={e => setFilter(e.target.id)}
        />
        <label htmlFor="cancelled">退会</label>

        <input
          type="radio"
          name="filter"
          id="all"
          checked={filter === "all"}
          onChange={e => setFilter(e.target.id)}
        />
        <label htmlFor="all">全て</label>
      </form>
    </div>
  );
};

export default FilterMemberships;
