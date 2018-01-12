import GenericAR from './_generic'
import {Map} from 'immutable';

import RKeys from 'actionReducers/keys.js'

//keys
const KEY_CARDS_DISPLAY_COUNT = "CARDS_DISPLAY_COUNT"

export default class ConfigActionReducer extends GenericAR { 
  static INIT_STATE = Map.of(
    RKeys.REHYDRATED, true,
    // KEY_IS_DEMO, true,
    KEY_CARDS_DISPLAY_COUNT, 8,
  )

  static EPICS = []

  static reducer(state = ConfigActionReducer.INIT_STATE, action) {
    switch(action.type) {
      default: return state;
    }
  }
}