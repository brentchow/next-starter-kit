import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import {signInWithEmailAndPassword, signUp} from '../services/Firebase';
import TextInput from './foundation/TextInput';

const AuthForm = ({...props}) => {
  const {isSignUp, redirectTo} = props;
  const router = useRouter();

  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(email);
  }, [email]);

  const [password, setPassword] = useState('');
  useEffect(() => {
    setPassword(password);
  }, [password]);

  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = useCallback(async () => {
    let user;

    try {
      if (isSignUp) {
        user = await signUp(email, password);
      } else {
        user = await signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }

    if (user) {
      router.push(redirectTo);
    }
  }, [email, isSignUp, password, redirectTo, router]);

  return (
    <form>
      {errorMessage}
      {/* TODO: email validation */}
      <TextInput
        autoComplete="username"
        id="email"
        name="email"
        onChange={setEmail}
        required
        type="text"
        value={email}
      >
        Email
      </TextInput>

      {/* TODO: password validation */}
      <TextInput
        autoComplete={isSignUp ? 'new-password' : 'current-password'}
        id="password"
        name="password"
        onChange={setPassword}
        required
        type="password"
        value={password}
      >
        Password
      </TextInput>

      <button onClick={handleSubmit} type="button">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

AuthForm.propTypes = {
  isSignUp: PropTypes.bool,
  redirectTo: PropTypes.string,
};

AuthForm.defaultProps = {
  isSignUp: false,
  redirectTo: '/dashboard',
};

export default AuthForm;
