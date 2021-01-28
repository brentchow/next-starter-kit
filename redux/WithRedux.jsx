import PropTypes from 'prop-types';
import React from 'react';
import {wrapDisplayName} from 'recompose';
import {createStore} from 'redux';

let savedStore;

const withRedux = ({initialState, Provider, rootReducer}) => (PageComponent) => {
  const makeStore = (state) => createStore(
    rootReducer,
    state,
    // Debug with React Native Debugger
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const getOrInitializeStore = (state) => {
    // Always make a new store if server, otherwise state is shared between requests.
    if (typeof window === 'undefined') {
      return makeStore(state);
    }

    // Create store with passed state if unavailable on the client and save it.
    if (!savedStore) {
      savedStore = makeStore(state);
    }

    return savedStore;
  };

  const WrappedComponent = ({reduxState, ...props}) => {
    const store = getOrInitializeStore(reduxState);
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  WrappedComponent.displayName = wrapDisplayName(PageComponent, 'withRedux');
  WrappedComponent.propTypes = {reduxState: PropTypes.shape({})};
  WrappedComponent.defaultProps = {reduxState: {}};

  WrappedComponent.getInitialProps = async (context) => {
    // Get or Create the store with initial state.
    const store = getOrInitializeStore(initialState);

    // Provide the store to getInitialProps of pages
    // eslint-disable-next-line no-param-reassign
    context.store = store;

    // Run getInitialProps from HOCed PageComponent
    const pageProps = typeof PageComponent.getInitialProps === 'function'
      ? await PageComponent.getInitialProps(context)
      : {};

    // Pass props to PageComponent
    return {
      ...pageProps,
      reduxState: store.getState(),
    };
  };

  return WrappedComponent;
};

export default withRedux;
