import { createAction } from "../redux/reducer";
import store from "../redux/store";

export const parse = doc => {
  const id = doc.id;
  const doctype = doc.doctype;

  if (!id || !doctype) {
    throw new Error("id, doctype must be provided when using firestore CRUD");
  }

  return { id, doctype };
};

export const sync = array => {
  const type = array && array[0] ? createAction(array[0].doctype) : null;

  type
    ? store.dispatch({
        type,
        payload: array,
      })
    : console.warn("doc not found");
};
