import {profilePhotoRef, profiles} from "../firebase/firebase";

export async function updatePhoto(auth: any, photo: File) {
    await profilePhotoRef(auth.uid).put(photo).then(async (task) => {
        let photoDownload = await task.ref.getDownloadURL();
        await profiles().doc(auth.uid).update({ photoUrl: photoDownload });
    });
}

export async function updateProfile(auth: any, profile: Profile) {
    await profiles().doc(auth.uid).set(profile);
}

export interface Profile {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    startupId: string;
    contacts: any;
    isAdmin: boolean;
    chats: string[];
    createdAt: any;
    updatedAt: any
}
