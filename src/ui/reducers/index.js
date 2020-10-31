import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
