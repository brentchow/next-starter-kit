import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import {createAction} from 'redux-actions';
import {defineAction} from 'redux-define';

const rootNamespace = 'root';

/**
 * Create a single Redux action.
 * @param {string} name - The action name formatted in `UPPER_SNAKE_CASE`.
 * @param {string} [parent=root] - The namespace for the action (default: `root`).
 * @example
 * export const setFooAction = createSingleAction('SET_FOO_VALUE');
 */
export const createSingleAction = (name, parent) => {
  const namespace = parent || rootNamespace;
  const actionType = defineAction(name, [], namespace).ACTION;
  return createAction(actionType);
};

/**
 * Create multiple Redux actions.
 * @param {string} name - The action name formatted in `UPPER_SNAKE_CASE`.
 * @param {string[]} subActions - Array of sub action names formatted in `UPPER_SNAKE_CASE`.
 * @param {string} [parent=root] - The namespace for the action (default: `root`).
 */
export const createMultipleActions = (name, subActions, parent) => {
  const namespace = parent || rootNamespace;
  const actionTypes = pick(defineAction(name, subActions, namespace), subActions);
  return mapValues(actionTypes, (actionType) => createAction(actionType));
};

/**
 * Creates multiple actions (`REQUEST``, `SUCCESS`, `ERROR`) related to a request.
 * @param {string} name - The request's action name formatted in `UPPER_SNAKE_CASE`.
 * @param {string} [parent=root] - The namespace for the action (default: `root`).
 */
export const createRequestActions = (name, parent) => (
  createMultipleActions(name, ['REQUEST', 'SUCCESS', 'ERROR'], parent)
);
