"use strict";

import cookie from "react-cookie";

import {BASE_URL, AUTH_COOKIE} from "constants/ApiConstants";
import {request} from "../libs/api";

/**
 * Determines if user is logged in
 * @return {boolean} - logged in
 */
export function isLoggedIn() {
  return Boolean(cookie.load(AUTH_COOKIE));
}

/**
 * Verifies user is logged or else redirects to login page
 * @param {Function} nextState - next router states
 * @param {Function} replace - trigger to transition to different url
 * @param {Function} callback - must be called to trigger transition
 */
export function requireAuth(nextState, replace, callback) {
  if (!isLoggedIn()) {
    replace("/login");
  }
  callback();
}

/**
 * Reset password
 * @param {String} token - reset token provided in email
 * @param {String} email - email to reset for
 * @param {String} password - new password
 * @return {Promise} returns Promise
 */
export function resetPassword(token, email, password) {
  return new Promise((resolve, reject) => {
    request(new Request(`${BASE_URL}/login/reset`, {
      method: "POST",
      body: JSON.stringify({token, email, password}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }), (err, data) => {
      if (err) {
        reject({
          payload: err
        });
      } else {
        resolve({
          payload: data
        });
      }
    });
  });
}

/**
 * Send password reset email
 * @param {String} email - user email
 * @return {Promise} returns Promise
 */
export function requestResetEmail(email) {
  return new Promise((resolve, reject) => {
    request(new Request(`${BASE_URL}/login/forgot`, {
      method: "POST",
      body: JSON.stringify({email}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }), (err, data) => {
      if (err) {
        reject({
          payload: err
        });
      } else {
        resolve({
          payload: data
        });
      }
    });
  });
}

/**
 * Login user
 * @param {String} email - user email
 * @param {String} password - user password
 * @return {Promise} returns Promise
 */
export function login(email, password) {
  return new Promise((resolve, reject) => {
    request(new Request(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }), (err, data) => {
      if (err) {
        reject({
          payload: err
        });
      } else {
        cookie.save(AUTH_COOKIE, data.token);
        resolve({
          payload: data
        });
      }
    });
  });
}

/**
 * Logout user
 * @param {Function} nextState - next router states
 * @param {Function} replace - trigger to transition to different url
 * @param {Function} callback - must be called to trigger transition
 */
export function logout(nextState, replace, callback) {
  cookie.remove(AUTH_COOKIE);
  replace("/login");
  callback();
}
