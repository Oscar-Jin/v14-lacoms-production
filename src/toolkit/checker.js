export const checkID = id => {
  if (id === undefined) {
    throw new Error("you must provide an id");
  } else {
    return id;
  }
};
