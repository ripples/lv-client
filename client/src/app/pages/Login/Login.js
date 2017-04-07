"use strict";

import React, {Component} from "react";
import {Link} from "react-router";
import {isLoggedIn} from "../../libs/auth";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";

/**
 * Login Page
 */
class Login extends Component {
  /**
   * constructor
   * @param {object} props properties passed down
   */
  constructor(props) {
    super(props);
    this.handleAuthed = this.handleAuthed.bind(this);
  }

  componentDidMount() {
    this.handleAuthed();
  }

  handleAuthed() {
    if (isLoggedIn()) {
      this.context.router.push("/");
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="login-page">
        <Header />
        <div className="content">
          <div className="login-container">
            <div className="login-wrap">
              <div className="login-form-header">
                <Logo size="16px"/>
                <div className="divider"></div>
                <img src="/images/logo.png"/>
              </div>
              {this.props.children}
              <Link to="/forgot" className="forgot">forgot your password?</Link>
            </div>
            <div className="login-splash"></div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Login.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default Login;
