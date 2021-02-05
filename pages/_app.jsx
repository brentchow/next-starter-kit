import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import {firebaseInitializeAction} from '../redux/ducks/App.Duck';
import {signInAction, signOutAction} from '../redux/ducks/User.Duck';
import wrapper from '../redux/Store';
import {firebaseInit, onAuthStateChange} from '../services/Firebase';
import theme from '../theme';

const MyApp = (props) => {
  const {
    Component,
    dispatchFirebaseInitialized,
    dispatchSignedIn,
    dispatchSignedOut,
    pageProps,
  } = props;

  useEffect(() => {
    const apps = firebaseInit();

    if (apps.length) {
      dispatchFirebaseInitialized();
      onAuthStateChange(dispatchSignedIn, dispatchSignedOut);
    }
  }, [dispatchFirebaseInitialized, dispatchSignedIn, dispatchSignedOut]);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  dispatchFirebaseInitialized: PropTypes.func.isRequired,
  dispatchSignedIn: PropTypes.func.isRequired,
  dispatchSignedOut: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any),
};

MyApp.defaultProps = {
  pageProps: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFirebaseInitialized: () => dispatch(firebaseInitializeAction()),
  dispatchSignedIn: (payload) => dispatch(signInAction(payload)),
  dispatchSignedOut: (payload) => dispatch(signOutAction(payload)),
});

export default wrapper.withRedux(connect(null, mapDispatchToProps)(MyApp));
