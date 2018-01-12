import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { createLogger } from 'redux-logger';
import {List, Iterable, fromJS} from 'immutable';
import { routerMiddleware, routerReducer } from 'react-router-redux'

import UserReducer from 'actionReducers/user.js'

const logger = createLogger({
  stateTransformer: state => {
    let newState = {};
    for (var i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) newState[i] = state[i].toJS();
      else newState[i] = state[i];
    };
    return newState;
  },
  actionTransformer: action => {
    let newAction = {};
    for (var i of Object.keys(action)) {
      if (Iterable.isIterable(action[i])) newAction[i] = action[i].toJS();
      else newAction[i] = action[i];
    };
    return newAction
  }
});

const actionReducersList = List.of(
  UserReducer
)

export default (history) => {
  const actionReducers = actionReducersList.groupBy( a => a.name)
    .map(a=>a.first().reducer)
    .toJS()
  const epics = actionReducersList.map(a => fromJS(a.EPICS))
    .flatten()
    .filter(f => f != null)
    .toJS()

  const middlewares = [
    createEpicMiddleware(combineEpics(...epics)),
    history ? routerMiddleware(history) : null,
    logger
  ].filter(a=>a);
  const combinedReducers = combineReducers(Object.assign(
    {router: routerReducer},
    actionReducers
  ))
  return createStore(
    combinedReducers,
    {},
    applyMiddleware(...middlewares)
  )
}
