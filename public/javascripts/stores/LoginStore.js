/*
 * LoginStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');
var cookie = require('react-cookie');

var CHANGE_EVENT = 'change';

var _jwt = cookie.load('lv-clientCookie');
var _user = null;

/**
 * Create the java web token (JWT) and user information
 * @param  {string} jwt The java web token
 */
function login(jwt) {
  _jwt = jwt;
  //TODO : add user information to cookie
  // add cookie implementation here
  var daysToExpire = 1;
  cookie.save('lv-clientCookie', jwt,
  /*Set to expire in an absolute time interval of days*/
  {maxAge : daysToExpire * 84600});
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
  switch(action.actionType) {
    case LoginConstants.LOGIN:
      var jwt = action.jwt.trim();
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
