import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import appReducer, {initialState as appInitialState} from './ducks/App.Duck';
import userReducer, {initialState as userInitialState} from './ducks/User.Duck';

const initialState = {
  app: {...appInitialState},
  user: {...userInitialState},
};

const combinedReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

const reducer = (state = initialState, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  }

  return combinedReducer(state, action);
};

const initStore = (initState) => createStore(reducer, initState, composeWithDevTools());

export default createWrapper(initStore);
