import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Map Firebase `User` response to just grab user properties.
 * @param {firebase.User} user - Firebase User response (https://firebase.google.com/docs/reference/js/firebase.User)
 * @returns User properties.
 */
function mapUserProperties(user) {
  return ({
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    metadata: user.metadata,
    multiFactor: user.multiFactor,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    providerData: user.providerData,
    providerId: user.providerId,
    refreshToken: user.refreshToken,
    tenantId: user.tenantId,
    uid: user.uid,
  });
}

/**
 * Firebase Configuration parameters.
 * @constant
 * @type Object
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

/**
 * Initialize Firebase app instance.
 * @returns An array of initialized apps.
 */
export function firebaseInit() {
  if (firebase.apps.length) {
    return firebase.apps;
  }

  return [firebase.initializeApp(firebaseConfig)];
}

/**
 * Set an observer to listen for authentication state changes. It will dispatch a provided sign in or sign out action.
 * @param {({user})} dispatchSignIn - Dispatch action for a user sign in. Provides user data to the dispatch payload.
 * @param {()} dispatchSignOut - Dispatch action for a user sign out.
 */
export function onAuthStateChange(dispatchSignIn, dispatchSignOut) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatchSignIn(mapUserProperties(user));
    } else {
      dispatchSignOut();
    }
  });
}

/**
 * Signs out the current user.
 * @returns A promise that will reject if there is an error.
 */
export function signOut() {
  return firebase.auth().signOut();
}

/**
 * Sign in with an email and password.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 */
export function signInWithEmailAndPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({user}) => ({
      idToken: user.idToken,
      email: user.email,
      refreshToken: user.refreshToken,
      expiresIn: user.expiresIn,
      localId: user.localId,
      registered: user.registered,
    }));
}

/**
 * Create a new user with an email and password.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 */
export function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({user}) => ({
      idToken: user.idToken,
      email: user.email,
      refreshToken: user.refreshToken,
      expiresIn: user.expiresIn,
      localId: user.localId,
      registered: user.registered,
    }));
}
