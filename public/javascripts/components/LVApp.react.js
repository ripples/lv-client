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
import loginStore from "../stores/LoginStore";
import loginAction from "../actions/LoginAction";
import {withRouter} from "react-router";
import {LoginConstants} from "../constants/LoginConstants";
import Header from "./Header";
import Footer from "./Footer";

class LVApp extends React.Component {
  constructor() {
    super();
    this.state = this.getLoginState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    loginStore.addChangeListener(this._onChange);
    loginStore.on("LOGIN_SUCCESS", this.redirectHome.bind(this));
    loginStore.on("LOGOUT", this.redirectLogin.bind(this));
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onChange);
    loginStore.removeListener(LoginConstants.LOGIN_SUCCESS, this.redirectHome.bind(this));
    loginStore.removeListener(LoginConstants.LOGOUT, this.redirectLogin.bind(this));
  }

  /**
   * @return {object}
   */

  render() {
    let renderedComponent = React.cloneElement(this.props.children, {isLoggedIn: loginStore.isLoggedIn()});
    return (
      <div className="mainWraper">
        <Header isLoggedIn={Boolean(this.state.jwt)}/>
        {renderedComponent}
        <Footer/>
      </div>
    );
  }

  /**
   * Event handler for "change" events coming from the LoginStore
   */
  _onChange() {
    this.setState(this.getLoginState());
  }

  redirectHome() {
    this.props.router.push("/");
  }

  redirectLogin() {
    this.props.router.push("/login");
  }

  testClick(event) {
    event.preventDefault();
    loginAction.logout();
  }

  /**
   * Retrieve the current Login data from the LoginStore
   * @return {object} - login state object
   */
  getLoginState() {
    return {
      jwt: loginStore.getJWT(),
      user: loginStore.getUser(),
    };
  }
}

let DecorateLVApp = withRouter(LVApp);
export default DecorateLVApp;

// PropTypes
LVApp.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
