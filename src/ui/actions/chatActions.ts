import {arrayUnion, chats, firestore, privateChats, profiles, timestamp} from "../firebase/firebase";
import {Profile} from "./profileActions";
import firebase from "firebase";

export const MESSAGES_COLLECTION = "messages";
export const OPEN_CHAT = '@chat/open-chat';
export const OPENING_CHAT = '@chat/opening-chat';

export async function sendMessage(author: Profile, chat: Chat, body: string) {

  let profileDoc = profiles().doc(author.id);
  let chatDoc = chats().doc(chat.id);
  let messageDoc = chatDoc.collection(MESSAGES_COLLECTION).doc();
  let message = {
    id: messageDoc.id,
    authorId: author.id,
    authorName: author.name,
    body: body,
    createdAt:timestamp()
  };
  await firestore.runTransaction(async transaction => {

    if(!chat?.members?.some(id => id === author.id)){
      transaction.update(chatDoc, { members: arrayUnion(author.id),});
    }

    if(!author.chats?.some(id => id === chat.id)){
      transaction.update(profileDoc, {chats: arrayUnion(chat.id)});
    }

    transaction
        .update(chatDoc, {lastMessage: message})
        .set(messageDoc, message)
  });
}

export async function sendPrivateMessage(profile: Profile, contactId: string, body: string){
  let contact = profile.contacts[contactId];

  let chat = contact?.chatId != null
      ? (await chats().doc(contact.chatId).get()).data()
      : (await createPrivateChat(profile, contactId));
  if(!chat) return;

  await sendMessage(profile, chat as Chat, body);
}

export async function createPrivateChat(profile: Profile, contactId: string) {
  if(profile?.contacts?.[contactId]?.chatId){
    return;
  }

  var chatDoc = privateChats().doc();
  var profileDoc = profiles().doc(profile.id);
  var contactProfileDoc = profiles().doc(contactId);
  var contactProfile = (await contactProfileDoc.get()).data() as Profile;

  if(!contactProfile.contacts){
    return;
  }

  profile.contacts[contactId] = {profileId: contactId, chatId: chatDoc.id};
  contactProfile.contacts[profile.id] = {profileId: profile.id, chatId: chatDoc.id};

  let chat = {
    id: chatDoc.id,
    members: [profile.id, contactProfile.id],
    lastMessage: null,
    type: "private"
  };

  return await firestore.runTransaction<Chat>(async transaction => {
    transaction
        .update(profileDoc, {
          contacts: profile.contacts,
          chats: arrayUnion(chatDoc.id)
        })
        .update(contactProfileDoc,  {
          contacts: contactProfile.contacts,
          chats: arrayUnion(chatDoc.id)
        })
        .set(chatDoc, chat);

    return chat;
  });
}

export function openChat(chatId: string, type: string, contactId: string | null) {
  return (dispatch: any) => {
    dispatch({
      type: OPEN_CHAT,
      payload: {
        chatId: chatId,
        type: type,
        contactId: contactId
      }
    });
  };
}

export function openPrivateChat(chatId: string, contactId: string){
  return openChat(chatId, "private", contactId);
}

export function openPublicChat(chatId: string){
  return openChat(chatId, "public", null);
}


export interface Chat {
  id: string;
  lastMessage: Message | null;
  members: string[];
  type: string;
}

export interface PrivateChat extends Chat{

}

export interface PublicChat extends Chat {
  name: string;
}

export interface Contact {
  profileId: string,
  chatId: string,
}

export interface Message {
  id: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: Date | firebase.firestore.FieldValue;
}
