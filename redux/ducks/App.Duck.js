import {handleActions} from 'redux-actions';

import {createSingleAction} from '../Actions';

export const firebaseInitializedAction = createSingleAction('SET_FIREBASE_INITIALIZED');

export const initialState = {
  isFirebaseInitialized: false,
};

export default handleActions({
  [firebaseInitializedAction]: (state) => ({
    ...state,
    isFirebaseInitialized: true,
  }),
}, initialState);
