import Head from 'next/head';
import React from 'react';

import WithAuthorization from '../components/WithAuthorization';
import {defaultProps as userDefaultProps, propTypes as userPropTypes} from '../redux/ducks/User.Duck';
import {signOut} from '../services/Firebase';

const Dashboard = (props) => {
  const {user} = props;

  return (
    <div className="container">
      <Head>
        <title>Dashboard</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <h1>Dashboard for {user.email}</h1>
        <p>This is a dashboard</p>
        <ul>
          <li>
            <button onClick={signOut} type="button">Logout</button>
          </li>
        </ul>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  ...userPropTypes,
};

Dashboard.defaultProps = {
  ...userDefaultProps,
};

export default WithAuthorization({redirectTo: '/'})(Dashboard);
