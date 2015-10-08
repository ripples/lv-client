/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * LoginActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {

  /**
   * Login to the system
   * @param  {string} jwt The java web token
   */
  login: function(jwt) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN,
      jwt: jwt
    });
  },

  /**
   * Logout of the system
   */
  logout: function() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT
    });
  }

};

module.exports = LoginActions;
