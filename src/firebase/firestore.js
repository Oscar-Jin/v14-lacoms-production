import { fb } from "./config";
import "firebase/firestore";
import { parse, sync } from "./firekit";

export const db = fb.firestore();

// ────────────────────────────────────────────────────────── リファレンス ───┐
const students = db.collection("students");
const memberships = db.collection("memberships");
const subscriptions = db.collection("subscriptions");
const tickets = db.collection("tickets");
const reservations = db.collection("reservations");
const payments = db.collection("payments");

const collections = [
  db.collection("students"),
  db.collection("memberships"),
  db.collection("subscriptions"),
  db.collection("tickets"),
  db.collection("reservations"),
  db.collection("payments"),
];

// ────────────────────────────────────────────────────────────────────────┘

// ───────────────────────────────────────────────────────────── リスナー ───┐
export const startListen = () => {
  let listeners = [];
  // const listeners = collections.map(collection => collection.onSnapshot(qs => {
  //   let docs = [];
  //   qs.forEach(doc => docs.push(doc.data()))
  //   sync(docs);
  // }))

  listeners.push(
    students.onSnapshot(qs => {
      let students = [];
      qs.forEach(doc => students.push(doc.data()));
      sync(students);
    })
  );

  listeners.push(
    memberships.onSnapshot(qs => {
      let memberships = [];
      qs.forEach(doc => memberships.push(doc.data()));
      sync(memberships);
    })
  );

  listeners.push(
    subscriptions.onSnapshot(qs => {
      let subscriptions = [];
      qs.forEach(doc => subscriptions.push(doc.data()));
      sync(subscriptions);
    })
  );

  listeners.push(
    tickets.onSnapshot(qs => {
      let tickets = [];
      qs.forEach(doc => tickets.push(doc.data()));
      sync(tickets);
    })
  );

  listeners.push(
    reservations.onSnapshot(qs => {
      let reservations = [];
      qs.forEach(doc => reservations.push(doc.data()));
      sync(reservations);
    })
  );

  listeners.push(
    payments.onSnapshot(qs => {
      let payments = [];
      qs.forEach(doc => payments.push(doc.data()));
      sync(payments);
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
