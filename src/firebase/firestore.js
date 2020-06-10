import { fb } from "./config";
import "firebase/firestore";
import { parse, sync } from "./firekit";

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
const collections = [
  db.collection(students),
  db.collection(memberships),
  db.collection(subscriptions),
  db.collection(tickets),
  db.collection(reservations),
  db.collection(payments),
];
// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── リスナー ───┐
export const startListen = () => {
  const listeners = collections.map(collection =>
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
    console.warn("20sec passed, listeners unsubscribed");
  }, 20000);

  return () => {
    listeners.forEach(unsubscribe => unsubscribe());
    console.warn("listeners unsubscribed");
  };
};
// ────────────────────────────────────────────────────────────────────────┘

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
