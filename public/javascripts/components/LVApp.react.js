"use strict";

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

import React from "react";

import FeedSection from "./FeedSection.react";
import loginStore from "../stores/LoginStore";

/**
 * Retrieve the current Login data from the LoginStore
 * @return {object} - login state object
 */
function getLoginState() {
  return {
    jwt: loginStore.getJWT(),
    user: loginStore.getUser()
  };
}

export default class LVApp extends React.Component {

  constructor() {
    super();
    this.state = getLoginState();
  }

  componentDidMount() {
    loginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onChange);
  }

  /**
   * @return {object}
   */

  render() {
    if (loginStore.isLoggedIn()) {
      return (
        <div>
          <FeedSection jwt={this.state.jwt}/>
        </div>
      );
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  /**
   * Event handler for "change" events coming from the LoginStore
   */
  _onChange() {
    this.setState(getLoginState());
  }

}
