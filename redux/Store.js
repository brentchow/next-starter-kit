import {Provider} from 'react-redux';
import {combineReducers} from 'redux';

import appReducer, {initialState as appInitialState} from './ducks/App.Duck';
import userReducer, {initialState as userInitialState} from './ducks/User.Duck';
import withRedux from './WithRedux';

const initialState = {
  app: {...appInitialState},
  user: {...userInitialState},
};

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

/**
 * NOTE: If some pages are static and don't use this HOC since it uses getInitialProps internally
 * which prevents their optimization. Apply this HOC only to interactive pages that use Redux.
 */
export default withRedux({
  initialState,
  Provider,
  rootReducer,
});
