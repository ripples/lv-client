"use strict";

/*
 * LoginStore
 */

import EventEmitter from "events";
import cookie from "react-cookie";

import appDispatcher from "../dispatcher/AppDispatcher";
import {LoginConstants} from "../constants/LoginConstants";
import ErrorConstants from "../constants/ErrorConstants";


const CHANGE_EVENT = "change";

let _jwt = cookie.load("lv-clientCookie");
let _user = null;

/**
 * Create the java web token (JWT) and user information
 * @param  {string} jwt The java web token
 */
function login(jwt) {
  _jwt = jwt;
  // TODO : add user information to cookie
  // add cookie implementation here
  const daysToExpire = 1;
  cookie.save("lv-clientCookie", jwt,
    // Set to expire in an absolute time interval of days
    {maxAge: daysToExpire * 84600});
}

/**
 * Logout of the system
 */
function logout() {
  cookie.remove("lv-clientCookie");
  _jwt = null;
  _user = null;
}

class LoginStore extends EventEmitter {
  
  /**
   * Checks if the user is logged into the system
   * @return {boolean} - if logged in
   */
  isLoggedIn() {
    return typeof _jwt !== "undefined";
  }
  
  /**
   * Get the JWT for communicating with the server
   * @return {string} - jwt token
   */
  getJWT() {
    return _jwt;
  }
  
  /**
   * Get the user information
   * @return {object} - user
   */
  getUser() {
    return _user;
  }
  
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  
  /**
   * emit the errors related to the login
   * @param {string} errorType - the error received
   */
  emitError(errorType) {
    switch (errorType) {
      case ErrorConstants.LOGIN_EMAIL_PASS_FAILED: {
        console.log("here on the emit error type\n", errorType, `\n=======\n`);
        this.emit(LoginConstants.EMAIL_PASS_FAILED);
        break;
      }
      case ErrorConstants.TOKEN_EXPIRED: {
        this.emit(LoginConstants.TOKEN_EXPIRED);
        break;
      }
      default: {
        this.emit(LoginConstants.UNEXPECTED_ERROR);
        break;
      }
    }
  }
  
  /**
   * @param {function} callback - called on event change
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
  /**
   * @param {function} callback - to be removed from event
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  
}

const loginStore = new LoginStore();

// Register callback to handle all updates
appDispatcher.register(action => {
  switch (action.actionType) {
    case LoginConstants.LOGIN: {
      const jwt = action.jwt.trim();
      if (jwt !== "") {
        login(jwt);
        loginStore.emit(LoginConstants.LOGIN_SUCCESS);
        loginStore.emitChange();
      }
      break;
    }
    case LoginConstants.LOGOUT: {
      logout();
      loginStore.emit(LoginConstants.LOGOUT);
      loginStore.emitChange();
      break;
    }
    case LoginConstants.ERROR: {
      loginStore.emitError(action.errorType);
      break;
    }
    default:
    // no op
  }
});

export default loginStore;
