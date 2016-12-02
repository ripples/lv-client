"use strict";

import React, {Component} from "react";

import {isLoggedIn} from "libs/auth";
import Header from "components/Header/header";
import Logo from "components/Logo/logo";
import LoginForm from "components/LoginForm/LoginForm";
import ForgotForm from "components/ForgotForm/ForgotForm";
import ResetForm from "components/ResetForm/ResetForm";

class Login extends Component {
  constructor(props) {
    super(props);
    const token = this.props.location.query.token;
    const email = this.props.location.query.email;
    this.state = {form: token ? "reset" : "login", reset: {token, email}};
    this.determineFormState.bind(this);
    this.handleAuthed.bind(this);
    this.onForgotForm.bind(this);
    this.onLoginForm.bind(this);
  }
  componentDidMount() {
    this.handleAuthed();
  }

  handleAuthed() {
    if (isLoggedIn()) {
      this.context.router.push("/");
    }
  }

  onLoginForm() {
    this.setState({form: "login"});
  }

  onForgotForm() {
    this.setState({form: "forgot"});
  }

  determineFormState() {
    let form;
    switch (this.state.form) {
      case "login":
        form = <LoginForm onLogin={this.handleAuthed} onForgotForm={this.onForgotForm}/>;
        break;
      case "forgot":
        form = <ForgotForm onLoginForm={this.onLoginForm}/>;
        break;
      case "reset":
        form = <ResetForm token={this.state.reset.token} email={this.state.reset.email} onLoginForm={this.onLoginForm}/>;
        break;
      default:
    }
    return form;
  }

  render() {
    const form = this.determineFormState();
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
            {form}
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
  location: React.PropTypes.object.isRequired
};

export default Login;
