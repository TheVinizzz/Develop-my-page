import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore'
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import DateFnsUtils from '@date-io/date-fns';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <React.StrictMode>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
