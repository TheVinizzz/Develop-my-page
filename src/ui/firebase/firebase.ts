import { Chat, PrivateChat } from "../actions/chatActions";
import { Profile } from "../actions/profileActions";

import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DB_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId:process.env.REACT_APP_FB_MEASUREMENT_ID
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

export var firestore = firebaseApp.firestore();
export var firebaseAuth = firebaseApp.auth();
export var firebaseStorage = firebaseApp.storage();
export var analytics = firebaseApp.analytics();

// FIRESTORE
 export function privateChats() {
   return firestore.collection("chats") as firebase.firestore.CollectionReference<PrivateChat>;
 }

export function chats() {
    return firestore.collection("chats") as firebase.firestore.CollectionReference<Chat>;
 }

export function profiles() {
    return firestore.collection("users") as firebase.firestore.CollectionReference<Profile>;
}

// STORAGE
export function profilePhotoRef(authId: string) {
    return firebaseStorage.ref("users/" + authId + "/photoUrl");
}


// FIELD VALUE
export function arrayUnion(elements: any) {
    return firebase.firestore.FieldValue.arrayUnion(elements);
}

export function timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
}

// ANALYTICS
function track(...args : any) {

    (window as any).gtag(...args);
}

export function pageview(props: any) {
    track('config', process.env.REACT_APP_FB_MEASUREMENT_ID, props);
}

export function event(type: any, props: any) {
    track('event', type, props);
}


export default firebaseApp;
