/*
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
