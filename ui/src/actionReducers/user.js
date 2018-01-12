import {fromJS} from 'immutable';
import {Observable} from 'rxjs'

import GenericAR, {jsonGet} from 'actionReducers/_generic.js'

const GOOGLE_LOGIN = "GOOGLE_LOGIN"

const FETCH_CURRENT_USER = "FETCH_CURRENT_USER"
const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS"
const FETCH_CURRENT_USER_FAILURE = "FETCH_CURRENT_USER_FAILURE"

//Keys
const KEY_LOADING = "KEY_LOADING"
const KEY_USER = "KEY_USER"
const KEY_ERROR = "KEY_ERROR"

export default class UserReducer extends GenericAR { 
  static INIT_STATE = fromJS({})

  static getUser = (state) => UserReducer.getIn(state, KEY_USER)

  static fetchCurrentUser = _ => ({type: FETCH_CURRENT_USER})
  static loggedInUser = (state) => UserReducer.getIn(state, KEY_USER)

  static EPICS = [

    (action$, store) => action$.ofType(FETCH_CURRENT_USER)
      .filter(action => UserReducer.getIn(store.getState(), KEY_USER) === undefined)
      .switchMap( action => jsonGet(`/api/me`)
        .takeUntil(action$.ofType(FETCH_CURRENT_USER))
        .map( ({response}) => {
          // success is actually a non empty user, /api/me returns an empty object when non logged in
          // instead of a 403, this prevents errors on forward trail iframes
          if(Object.keys(response).length > 0) {
            return ({type: FETCH_CURRENT_USER_SUCCESS, user: fromJS(response)})
          } else {
            return ({type: FETCH_CURRENT_USER_FAILURE, response: fromJS({})})
          }
        })
        .catch( error => Observable.of({
          type: FETCH_CURRENT_USER_FAILURE,
          response: fromJS(error.xhr.response)
        }))
      ),

    // (action$, store) => action$.ofType(FETCH_CURRENT_USER_SUCCESS)
    //   .filter(action => action.user != null)
    //   .map(_ =>  SocketAR.start()),

    (action$, store) => action$.ofType(FETCH_CURRENT_USER_SUCCESS)
      .map(action => UserReducer.fetchFWDUser()),
    
    (action$, store) => action$.ofType(FETCH_CURRENT_USER_SUCCESS)
      .map(action => UserReducer.fetchFWDAccountCustomFields(action.user.get("fwdTrailTeamId")))
  ]

  static reducer(state = UserReducer.INIT_STATE, action) {
    switch(action.type) {
      case GOOGLE_LOGIN:
        return state.set('authenticating', 'google')
      case FETCH_CURRENT_USER:
        return state.set(KEY_LOADING, true)
      case FETCH_CURRENT_USER_SUCCESS:
        return state.set(KEY_USER, action.user)
                    .set(KEY_LOADING, false)
      case FETCH_CURRENT_USER_FAILURE:
        return state.set(KEY_USER, null)
                    .set(KEY_ERROR, "could not fetch current user")
                    .set(KEY_LOADING, false)
      default: return state;
    }
  }
}