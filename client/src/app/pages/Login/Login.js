"use strict";

import React, {Component} from "react";

import {isLoggedIn} from "../../libs/auth";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";

class Login extends Component {
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

  render() {
    return (
      <div className="login-page">
        <Header />
        <div className="content">
          <div className="login-wrap">
            <div className="login-form-header">
              <Logo size="25px"/>
              <div className="divider">|</div>
              <img src="/images/logo.png"/>
            </div>
            {this.props.children}
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
