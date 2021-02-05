import PropType from 'prop-types';
import {handleActions} from 'redux-actions';

import {createSingleAction} from '../Actions';

export const signInAction = createSingleAction('SET_SIGNED_IN');
export const signOutAction = createSingleAction('SET_SIGNED_OUT');

export const initialState = {
  displayName: null,
  email: null,
  emailVerified: null,
  isAnonymous: null,
  isSignedIn: null,
  metadata: null,
  multiFactor: null,
  phoneNumber: null,
  photoURL: null,
  providerData: null,
  providerId: null,
  refreshToken: null,
  tenantId: null,
  uid: null,
};

export default handleActions({
  [signInAction]: (state, {payload}) => ({
    ...state,
    ...payload,
    isSignedIn: true,
  }),
  [signOutAction]: (state) => ({
    ...state,
    ...initialState,
    isSignedIn: false,
  }),
}, initialState);

export const propTypes = {
  user: PropType.shape({
    displayName: PropType.string,
    email: PropType.string,
    emailVerified: PropType.bool,
    isAnonymous: PropType.bool,
    isSignedIn: PropType.bool,
    metadata: PropType.objectOf(PropType.any),
    multiFactor: PropType.objectOf(PropType.any),
    phoneNumber: PropType.string,
    photoURL: PropType.string,
    providerData: PropType.arrayOf(PropType.any),
    providerId: PropType.string,
    refreshToken: PropType.string,
    tenantId: PropType.string,
    uid: PropType.string,
  }),
};

export const defaultProps = {user: initialState};
