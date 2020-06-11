export const extractIdFrom = props => {
  if (props === undefined) {
    throw new Error("you must provide props");
  } else if (props.id === undefined) {
    throw new Error("you must provide an id");
  } else {
    return props.id;
  }
};
