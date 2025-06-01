import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {firebaseConfig} from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage};