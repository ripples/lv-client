"use strict";

import React, {PropTypes, Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {login} from "actions/user";
import Header from "components/Header/header";
import Logo from "components/Logo/logo";
import FormError from "components/FormError/formError";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
  }

  handleChange(e, field) {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {[field]: e.target.value}));
  }

  render() {
    const loginError = this.props.error ? <FormError error={this.props.error}/> : null;
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
            <form onSubmit={this.handleLogin}
              noValidate="novalidate">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e, "email")}
                  required="required"
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e, "password")}
                  required="required"
                />
              </div>
              {loginError}
              <button
                type="submit"
                disabled={!(this.state.email && this.state.password)}
                className="button accent outline">
                Log In
              </button>
            </form>
            <div style={{fontStyle: "italic", margin: "20px 0"}}>- or -</div>
            <a href="#" className="button accent">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default connect(state => {
  return {
    error: state.user.error
  };
}, dispatch => {
  return bindActionCreators({
    onLogin: login
  }, dispatch);
})(Login);
