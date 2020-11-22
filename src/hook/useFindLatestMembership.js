import moment from "moment";
import last from "lodash/last";

import { $status } from "../template/membership";
import { useSelector } from "react-redux";
import { selectMemberships } from "../redux/selector";

const useFindLatestMembership = () => {
  const allMemberships = useSelector(selectMemberships);

  return uid => {
    if (!uid) {
      throw new Error("uid must be provided for finding membership");
    }

    const memberships =
      allMemberships.filter(membership => membership.uid === uid) || [];
    const latest = last(memberships) || {};
    if (latest.status === $status.cancelled) {
      return latest;
    } else if (
      moment(latest.iso8601).format("YYYY-MM") ===
      moment("2020-08-31").format("YYYY-MM")
    ) {
      return latest;
    } else {
      return latest;
    }
  };
};

export default useFindLatestMembership;
