import PropType from 'prop-types';
import {handleActions} from 'redux-actions';

import {createSingleAction} from '../Actions';

export const firebaseInitializeAction = createSingleAction('SET_FIREBASE_INITIALIZED');

export const initialState = {
  isFirebaseInitialized: false,
};

export default handleActions({
  [firebaseInitializeAction]: (state) => ({
    ...state,
    isFirebaseInitialized: true,
  }),
}, initialState);

export const propTypes = {
  app: PropType.shape({
    isFirebaseInitialized: PropType.bool.isRequired,
  }),
};

export const defaultProps = {app: initialState};
