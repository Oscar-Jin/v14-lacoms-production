import React from "react";

const FilterMemberships = () => {
  return (
    <div>
      <form style={{ marginLeft: "2rem", display: "inline-block" }}>
        <input type="radio" id="enrolled" value="enrolled" name="filter" />
        <label htmlFor="enrolled">ENROLLED STUDENT</label>
        <br />
        <input type="radio" id="past" value="past" name="filter" />
        <label htmlFor="past">PAST STUDENT</label>
        <br />
        <input type="radio" id="all" value="all" name="filter" />
        <label htmlFor="all">ALL</label>
      </form>
    </div>
  );
};

export default FilterMemberships;
