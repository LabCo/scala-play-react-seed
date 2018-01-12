import {Iterable, fromJS} from 'immutable';
import {HOSTNAME} from 'conf/settings.js'
import {Observable} from 'rxjs'

const TIMEOUT = 10000;

export default class GenericActionReducer {
  static reducer(state = GenericActionReducer.INIIAL_STATE, action) {
    switch(action.type) {
      default: return state
    }
  }
  static getState(state) { return state[this.name]; }
  static getIn(state, pathArr, defaultValue) {
    const iS = Iterable.isIterable(state[this.name])? state[this.name]:fromJS(state[this.name])

    var returnValue
    if(iS) {
      returnValue = Array.isArray(pathArr) ? iS.getIn(pathArr) : iS.get(pathArr);
    }
    return returnValue !== undefined ? returnValue : defaultValue;
  }

  static INIIAL_STATE = fromJS({})
}

export const formAjax = (props) => {
  let {url, ..._props} = props;
  if(!url.startsWith("http")) url = [HOSTNAME, url.replace(/^\/+/, "")].join("/")

  return Observable.ajax(Object.assign({
    url: url,
    headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},
    timeout: TIMEOUT
  }, _props))
}

export const jsonAjax = (props) => {
  let {url, ..._props} = props;
  if(!url.startsWith("http")) url = [HOSTNAME, url.replace(/^\/+/, "")].join("/")

  return Observable.ajax(Object.assign({
    url: url,
    headers:{"Content-Type":"application/json"},
    timeout: TIMEOUT
  }, _props))
}

export const jsonGet = (url, queryParams, props) => {
  const query = queryParams && fromJS(queryParams).filter(a => a).map((v, k) => k + "="+ v).join("&")
  if(query != null) url = url + "?" + query;
  
  return jsonAjax(Object.assign({}, props, {url, method: 'GET'}))
}
export const jsonPost = (url, body, props) => {
  return jsonAjax(Object.assign({}, props, {url, body, method: 'POST'}))
}
export const jsonPut = (url, props) => jsonAjax(Object.assign({}, props, {url, method: 'PUT'}))
export const jsonDelete = (url, props) => jsonAjax(Object.assign({}, props, {url, method: 'DELETE'}))

export const formPost = (url, body, props) => {
  return formAjax(Object.assign({}, props, {url, body, method: 'POST'}))
}