import { fb } from "./config";
import "firebase/firestore";
import { parse } from "./firekit";

export const db = fb.firestore();

// ─────────────────────────────────────────────────────────── CRUD 操作 ───┐
export const cloudCreate = doc => {
  const { id, doctype } = parse(doc);
  db.collection(`${doctype}s`).doc(id).set(doc);
};

export const cloudUpdate = doc => {
  const { id, doctype } = parse(doc);
  db.collection(`${doctype}s`).doc(id).update(doc);
};

export const cloudDelete = doc => {
  const { id, doctype } = parse(doc);
  db.collection(`${doctype}s`).doc(id).delete();
};
// ────────────────────────────────────────────────────────────────────────┘
