import { createStore, combineReducers } from 'redux';
import firebase from 'firebase/app';
require('firebase/auth');
import 'firebase/firestore';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// Reducers
import notifyReducer from './redux/reducers/notifyReducer';
import settingReducer from './redux/reducers/settingReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyCqH2TedWvulHOjBQnuZ_HBjwaMOwPicbE',
  authDomain: 'client-panel-5acf5.firebaseapp.com',
  projectId: 'client-panel-5acf5',
  storageBucket: 'client-panel-5acf5.appspot.com',
  messagingSenderId: '861149662118',
  appId: '1:861149662118:web:41472d86b0fafce86cdd67',
};

// React-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

//init firebase instant
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();

// Add firebase to reducers

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingReducer,
});

// Persist to local storage
if (localStorage.getItem('settings') === null) {
  const defaultSetting = {
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false,
    onAllowRegistration: false,
  };

  localStorage.setItem('settings', JSON.stringify(defaultSetting));
}

// initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export { store, rrfProps };
