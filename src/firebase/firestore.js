import { fb } from "./config";
import "firebase/firestore";
import { parse, sync } from "./firekit";
import { checkID } from "../toolkit/checker";

export const db = fb.firestore();

// ──────────────────────────────────────────────────────────────── 定数 ───┐
const students = "students";
const memberships = "memberships";
const subscriptions = "subscriptions";
const tickets = "tickets";
const reservations = "reservations";
const payments = "payments";
// ────────────────────────────────────────────────────────────────────────┘

// ────────────────────────────────────────────────────────── リファレンス ───┐
const collections = {
  students: db.collection(students).orderBy("lastName_hiragana"),
  memberships: db.collection(memberships).orderBy("iso8601"),
  subscriptions: db.collection(subscriptions).orderBy("iso8601"),
  tickets: db.collection(tickets).orderBy("type").orderBy("iso8601"),
  reservations: db.collection(reservations).orderBy("iso8601"),
  payments: db.collection(payments).orderBy("iso8601"),
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── リスナー ───┐
export const startListen = () => {
  const listeners = Object.values(collections).map(collection =>
    collection.onSnapshot(qs => {
      let docs = [];
      qs.forEach(doc => docs.push(doc.data()));
      sync(docs);
    })
  );

  setTimeout(() => {
    listeners.forEach(unsubscribe => {
      unsubscribe();
    });
    console.warn("10sec passed, listeners unsubscribed");
  }, 10000);

  return () => {
    listeners.forEach(unsubscribe => unsubscribe());
    console.warn("listeners unsubscribed");
  };
};
// ────────────────────────────────────────────────────────────────────────┘

// ─────────────────────────────────────────────────────────── CRUD 操作 ───┐
export const cloudCreate = doc => {
  const { id, doctype } = parse(doc);
  return db.collection(`${doctype}s`).doc(id).set(doc);
};

export const cloudUpdate = doc => {
  const { id, doctype } = parse(doc);
  return db.collection(`${doctype}s`).doc(id).update(doc);
};

export const cloudDelete = doc => {
  const { id, doctype } = parse(doc);
  return db.collection(`${doctype}s`).doc(id).delete();
};
// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────────────── 検索 ───┐
export const deleteDocsMatchUid = id => {
  const uid = checkID(id);

  Object.values(collections).forEach(collection => {
    collection
      .where("uid", "==", uid)
      .get()
      .then(qs => qs.forEach(doc => cloudDelete(doc.data())));
  });
};
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────── playground ───┐

// ────────────────────────────────────────────────────────────────────────┘
