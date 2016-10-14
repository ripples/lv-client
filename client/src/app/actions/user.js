"use strict";

import cookie from "react-cookie";

import {BASE_URL, AUTH_COOKIE} from "constants/ApiConstants";
import {request} from "../libs/api";

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

/**
 * Login user
 * @param {String} email - user email
 * @param {String} password - user password
 * @return {function(*)} calls dispatch
 */
export function login(email, password) {
  return dispatch => {
    request(new Request(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }), (err, data) => {
      if (err) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err
        });
      } else {
        cookie.save(AUTH_COOKIE, data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data
        });
      }
    });
  };
}

/**
 * Logout user
 * @return {function(*)} calls dispatch
 */
export function logout() {
  return dispatch => {
    cookie.remove(AUTH_COOKIE);
    dispatch({type: LOGOUT});
  };
}
