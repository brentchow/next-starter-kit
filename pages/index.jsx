import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {signOut} from '../services/Firebase';

const Home = (props) => {
  const {isSignedIn} = props;

  let nav;

  if (isSignedIn) {
    nav = (
      <ul>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <button onClick={signOut} type="button">Logout</button>
        </li>
      </ul>
    );
  } else {
    nav = (
      <ul>
        <li>
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <h1>Home page</h1>
        {nav}
      </main>
    </div>
  );
};

Home.propTypes = {
  isSignedIn: PropTypes.bool,
};

Home.defaultProps = {
  isSignedIn: null,
};

const mapStateToProps = ({user}) => ({isSignedIn: user.isSignedIn});

export default connect(mapStateToProps)(Home);
