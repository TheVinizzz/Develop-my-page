// @ts-ignore
import { firebaseAuth, firebaseStorage, firestore } from "../firebase/firebase";
import {Profile} from "./profileActions";

export async function login(email: any, password: any) {
  await firebaseAuth.signInWithEmailAndPassword(email, password);
}

export async function logout() {
  await firebaseAuth.signOut();
}

export async function register(email: any, password: any, profile: Profile, photoFile: File) {
  try {
    let auth = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    if (auth == null || !auth.user?.uid)
      return;


    await firestore.collection("users").doc(auth.user.uid).set({ ...profile, "id": auth.user.uid });
    if (photoFile != null) {
      firebaseStorage.ref("users/" + auth.user.uid + "/photoUrl").put(photoFile).then(async (task) => {
        let photoDownload = await task.ref.getDownloadURL();
        firestore.collection("users").doc(auth.user?.uid).update({ photoUrl: photoDownload });
      });
    }
  }
  catch (e) {
    console.log(e);
  }
}
