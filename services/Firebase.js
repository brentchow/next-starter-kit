import * as firebase from 'firebase';
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig();
const {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} = serverRuntimeConfig;

/**
 * Firebase Configuration parameters.
 * @constant
 * @type Object
 */
export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  appId: FIREBASE_APP_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
};

/**
 * Initialize Firebase app instance.
 * @param {string} [name] - Optional name of the app to initialize. If no name is provided, the
 * default is "[DEFAULT]".
 * @returns An array of initialized apps.
 */
export function initFirebase(name) {
  if (!firebase.apps.length) {
    return [firebase.initializeApp(firebaseConfig, name)];
  }

  return firebase.apps;
}

/**
 * Set an observer to listen for authentication state changes. It will dispatch a provided sign in
 * or sign out action.
 * @param {()} dispatchSignIn - Dispatch action for a user sign in. Provides the user data to the
 * dispatch payload.
 * @param {()} dispatchSignOut - Dispatch action for a user sign out.
 */
export function onAuthStateChange(dispatchSignIn, dispatchSignOut, dispatchFirebaseInitialized) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatchSignIn({user});
    } else {
      dispatchSignOut();
    }

    dispatchFirebaseInitialized();
  });
}

/**
 * Signs out the current user.
 * @returns A promise that will reject if there is an error.
 */
export function signOut() {
  return firebase.auth().signOut();
}
