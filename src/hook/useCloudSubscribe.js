import { useSelector } from "react-redux";
import { useEffect } from "react";
import { startListen } from "../firebase/firestore";

const useCloudSubscribe = () => {
  const user = useSelector(state => state.user);

  useEffect(() => {
    let unsubscribe = () => {};

    if (user && user.uid) {
      unsubscribe = startListen();
    } else {
      unsubscribe();
    }

    return () => unsubscribe();
  }, [user]);

  return user;
};

export default useCloudSubscribe;
