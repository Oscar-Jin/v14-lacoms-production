import * as firebase from "firebase/app";
import devConfig from "./dev-config.json";
import prodConfig from "./prod-config.json";

const dev = devConfig;

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

const prod = prodConfig;

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

export const fb = initialize(prodServer); // <-- override point ⚠️
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
