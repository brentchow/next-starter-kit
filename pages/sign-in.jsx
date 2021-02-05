import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import AuthForm from '../components/AuthForm';
import WithAuthorization from '../components/WithAuthorization';

const SignIn = () => (
  <div className="container">
    <Head>
      <title>Sign In</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <main>
      <h1>Sign In</h1>
      <AuthForm redirectTo="/dashboard" />
      <Link href="/">
        <a>Home</a>
      </Link>
    </main>
  </div>
);

export default WithAuthorization({redirectTo: '/dashboard', redirectIfAuthorized: true})(SignIn);

