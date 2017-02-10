"use strict";

import cookie from "react-cookie";
import axios from "axios";

import {AUTH_COOKIE} from "../constants/ApiConstants";

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
 * @param {String} password - new password
 * @return {Promise} returns Promise
 */
export function resetPassword(token, password) {
  return axios.post("/login/reset", {token, password});
}

/**
 * Send password reset email
 * @param {String} email - user email
 * @return {Promise} returns Promise
 */
export function requestResetEmail(email) {
  return axios.post("/login/forgot", {email});
}

/**
 * Login user
 * @param {String} email - user email
 * @param {String} password - user password
 * @return {Promise} returns Promise
 */
export function login(email, password) {
  return axios.post("/login", {email, password}).then(response => {
    cookie.save(AUTH_COOKIE, response.data.token);
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
