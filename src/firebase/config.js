import * as firebase from "firebase/app";

const dev = {
  apiKey: "AIzaSyAkc8Uf8AEaNihQy2GI2zuWCzb-vNNDuvQ",
  authDomain: "lacoms-development-database.firebaseapp.com",
  databaseURL: "https://lacoms-development-database.firebaseio.com",
  projectId: "lacoms-development-database",
  storageBucket: "lacoms-development-database.appspot.com",
  messagingSenderId: "552208249632",
  appId: "1:552208249632:web:e19aedfed73282f1419d45",
  measurementId: "G-HFV54D3GQV",
};

// this one connects to kinchanatwork@gmail.com
// const prod = {
//   apiKey: "AIzaSyDXPYmEWs_Ngn9pUcb9dRoQQ_G08VYxyso",
//   authDomain: "lacoms-production-server.firebaseapp.com",
//   databaseURL: "https://lacoms-production-server.firebaseio.com",
//   projectId: "lacoms-production-server",
//   storageBucket: "lacoms-production-server.appspot.com",
//   messagingSenderId: "1007306054168",
//   appId: "1:1007306054168:web:bdb19835f9e0ee7903416d",
//   measurementId: "G-8C6G5YX3LK",
// };

const prod = {
  apiKey: "AIzaSyBlVpu45rAGyIgDUNhWR7P9JjyrSiGwJN0",
  authDomain: "lacoms-production-database.firebaseapp.com",
  databaseURL: "https://lacoms-production-database.firebaseio.com",
  projectId: "lacoms-production-database",
  storageBucket: "lacoms-production-database.appspot.com",
  messagingSenderId: "218924369933",
  appId: "1:218924369933:web:7659e0aeca506a02dced44",
  measurementId: "G-64TY1NJYWG",
};

// ──────────────────────────────────────────────────────────────── 手動 ───┐
const devServer = "devServer";
const prodServer = "prodServer";

const initialize = mode => {
  switch (mode) {
    case devServer:
      return firebase.initializeApp(dev, "dev");
    case prodServer:
      return firebase.initializeApp(prod, "prod");
    default:
      return null;
  }
};

export const fb = initialize(devServer);
// ────────────────────────────────────────────────────────────────────────┘

// ──────────────────────────────────────────────────────────────── 自動 ───┐
// export let fb = firebase.initializeApp(dev, "dev");

// export const useDevServer = () => {
//   fb.delete();
//   fb = firebase.initializeApp(dev, "dev");
// };

// export const useProdServer = () => {
//   fb.delete();
//   fb = firebase.initializeApp(prod, "prod");
// };
// ────────────────────────────────────────────────────────────────────────┘
