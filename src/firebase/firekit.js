export const parse = doc => {
  const id = doc.id;
  const doctype = doc.doctype;

  if (!id || !doctype) {
    throw new Error("id, doctype must be provided when using firestore CRUD");
  }

  return { id, doctype };
};
