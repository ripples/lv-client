/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LoginStore and passes the new data to its children.
 */

var FeedSection = require('./FeedSection.react');
var LoginSection = require('./LoginSection.react');
var React = require('react');
var LoginStore = require('../stores/LoginStore');

/**
 * Retrieve the current Login data from the LoginStore
 */
function getLoginState() {
  return {
    jwt: LoginStore.getJWT(),
    user: LoginStore.getUser()
  };
}

var LVApp = React.createClass({

  getInitialState: function() {
    return getLoginState();
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    if(LoginStore.isLoggedIn()){
      return (
        <div>
          <FeedSection />
        </div>
      );
    }
    else{
      return (
        <div>
          <LoginSection />
        </div>
      );
    }
  },

  /**
   * Event handler for 'change' events coming from the LoginStore
   */
  _onChange: function() {
    this.setState(getLoginState());
  }

});

module.exports = LVApp;
