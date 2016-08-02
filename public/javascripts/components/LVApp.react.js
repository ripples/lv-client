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
import SweetAlert from "sweetalert-react";
import {AlertMessages, AlertTitles, AlertTypes} from "../utils/AlertMessages"
import Header from "./Header";
import Footer from "./Footer";

class LVApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getLoginState();
    this._onChange = this._onChange.bind(this);
    this.iddleTime = null; // holds the set time out function to redirect the page when the token expires
    this.waitTime = 3000; // wait time after the redirect alert appears
  }
  
  componentDidMount() {
    loginStore.addChangeListener(this._onChange);
    loginStore.on(LoginConstants.LOGIN_SUCCESS, this._redirectHome.bind(this));
    loginStore.on(LoginConstants.LOGOUT, this._redirectLogin.bind(this));
    loginStore.on(LoginConstants.EMAIL_PASS_FAILED, this._alertLoginFail.bind(this));
    loginStore.on(LoginConstants.TOKEN_EXPIRED, this._alertTokenExpired.bind(this));
  }
  
  componentWillUnmount() {
    loginStore.removeChangeListener(this._onChange);
    loginStore.removeListener(LoginConstants.LOGIN_SUCCESS, this._redirectHome.bind(this));
    loginStore.removeListener(LoginConstants.LOGOUT, this._redirectLogin.bind(this));
    loginStore.removeListener(LoginConstants.EMAIL_PASS_FAILED, this._alertLoginFail.bind(this));
    loginStore.removeListener(LoginConstants.TOKEN_EXPIRED, this._alertTokenExpired.bind(this));
    clearTimeout(this.iddleTime);
  }
  
  render() {
    const renderedComponent = React.cloneElement(this.props.children, {isLoggedIn: loginStore.isLoggedIn()});
    return (
      <div className="mainWraper inheritProps">
        <Header isLoggedIn={Boolean(this.state.jwt)}/>
        {renderedComponent}
        <SweetAlert show={this.state.alertVisible} {...this.state.alertOptions}/>
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
  
  /**
   * Redirects to home page after A successful login
   * @private
   */
  _redirectHome() {
    this.props.router.push("/");
  }
  
  /**
   * Redirects To login Page after A logout or token expired
   * @private
   */
  _redirectLogin() {
    this.props.router.push("/login");
  }
  
  /**
   * shows the Login Error message
   * @private
   */
  _alertLoginFail() {
    this.setState({
      alertVisible: true,
      alertOptions: {
        title: AlertTitles.loginEmailWarning,
        text: AlertMessages.loginEmailFail,
        type: AlertTypes.error,
        onConfirm: ()=> {
          this.setState({alertVisible: false});
          loginAction.logout();
        }
      }
    });
    
  }
  
  /**
   * shows the token expired warning and redirects to the login page after the wait time
   * @private
   */
  _alertTokenExpired() {
    this.setState({
      alertVisible: true,
      alertOptions: {
        title: AlertTitles.tokenExpired,
        text: AlertMessages.tokenExpired,
        type: AlertTypes.warning,
        onConfirm: ()=> {
          this.setState({alertVisible: false});
          loginAction.logout();
        }
      }
    });
    this.iddleTime = setTimeout(()=> {
      this.setState({alertVisible: false});
      loginAction.logout();
    }, this.waitTime);
  }
  
  /**
   * Retrieve the current Login data from the LoginStore
   * @return {object} - login state object
   */
  getLoginState() {
    return {
      jwt: loginStore.getJWT(),
      user: loginStore.getUser(),
      alertVisible: false,
      alertOptions: this._getAlertOptions()
    };
  }
  
  /**
   * Retrieve the initial options of Custom alert
   * @returns {{title: string, onConfirm: (function())}}
   * @private
   */
  _getAlertOptions() {
    return {
      title: "",
      onConfirm: ()=> {
        this.setState({alertVisible: false})
      }
    }
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
