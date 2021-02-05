import {useRouter} from 'next/router';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {defaultProps as appDefaultProps, propTypes as appPropTypes} from '../redux/ducks/App.Duck';
import {defaultProps as userDefaultProps, propTypes as userPropTypes} from '../redux/ducks/User.Duck';

/**
 * HOC for handling Authorization and Firebase initilization loading. Allows for a user to be redirected whether they're
 * logged in or not.
 *
 * @param {Object} config - Config for Authorization handling.
 * @param {string} config.redirectTo - The path to redirect a user to.
 * @param {boolean} [config.redirectIfAuthorized] - If `true`, redirect if authorized. If `false`, redirect if signed
 * out.
 */
const WithAuthorization = ({redirectTo, redirectIfAuthorized = false}) => (Component) => {
  const Authorizer = (props) => {
    const {app, user} = props;
    const {isFirebaseInitialized} = app;
    const {isSignedIn} = user;

    const router = useRouter();

    if (isFirebaseInitialized) {
      // `isSignedIn` defaults null, must strictly specify false.
      if ((isSignedIn && !redirectIfAuthorized) || (isSignedIn === false && redirectIfAuthorized)) {
        return (<Component {...props} />);
      }

      if (isSignedIn && redirectTo && redirectIfAuthorized) {
        router.push(redirectTo);
      }

      // `isSignedIn` defaults null, must strictly specify false.
      if (isSignedIn === false && redirectTo && !redirectIfAuthorized) {
        router.push(redirectTo);
      }
    }

    // TODO: Create Loading Page
    return (<h1>Loading...</h1>);
  };

  Authorizer.propTypes = {
    ...appPropTypes,
    ...userPropTypes,
  };

  Authorizer.defaultProps = {
    ...appDefaultProps,
    ...userDefaultProps,
  };

  const mapStateToProps = (state) => state;

  return compose(connect(mapStateToProps))(Authorizer);
};

export default WithAuthorization;
