/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * LoginStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _jwt = null;
var _user = null;

/**
 * Create the java web token (JWT) and user information
 * @param  {string} jwt The java web token
 */
function login(jwt) {
  _jwt = jwt;
  // _user = jwt_decode(this._jwt); require jwt-decode
  // add cookie implementation here
}

/**
 * Logout of the system
 */
function logout() {
  _jwt = null;
  _user = null;
}

var LoginStore = assign({}, EventEmitter.prototype, {

  /**
   * Checks if the user is logged into the system
   * @return {boolean}
   */
  isLoggedIn: function() {
    return !!_jwt;
  },

  /**
   * Get the JWT for communicating with the server
   * @return {string}
   */
  getJWT: function() {
    return _jwt;
  },

  /**
   * Get the user information
   * @return {object}
   */
  getUser: function() {
    return _user;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case LoginConstants.LOGIN:
      jwt = action.jwt.trim();
      if (jwt !== '') {
        login(jwt);
        LoginStore.emitChange();
      }
      break;

    case LoginConstants.LOGOUT:
      logout();
      LoginStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = LoginStore;
