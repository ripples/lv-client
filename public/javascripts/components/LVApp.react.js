"use strict";

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

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onChange);
    loginStore.removeListener(LoginConstants.LOGIN_SUCCESS, this.redirectHome.bind(this));
    loginStore.removeListener(LoginConstants.LOGOUT, this.redirectLogin.bind(this));
  }

  /**
   * @return {object}
   */

  render() {
    const renderedComponent = React.cloneElement(this.props.children, {isLoggedIn: loginStore.isLoggedIn()});
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

const DecorateLVApp = withRouter(LVApp);
export default DecorateLVApp;

// PropTypes
LVApp.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  children: React.PropTypes.any.isRequired
};
