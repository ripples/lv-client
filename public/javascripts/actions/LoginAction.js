/*
 * LoginActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var api = require('../API.js');

var LoginActions = {

  /**
   * Login to the system
   * @param  {string} jwt The java web token
   */
  login: function(data) {
    api.login({
      data : data,
      success : function(data){
        AppDispatcher.dispatch({
          actionType: LoginConstants.LOGIN,
          jwt: data.token
        });
      }
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
