"use strict";

import React, {PropTypes, Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {login} from "../../actions/user";
// import logo from "../../../images/logo.png";
import Header from "components/Header/header";
import Logo from "components/Logo/logo";

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
    return (
      <div className="login-page">
        <Header />
        <div className="content">
          <div className="login-wrap">
            <div className="login-form-header">
              <Logo size="25px"/>
              <span style={{fontSize: "20px"}}>|</span>
              <img width="135px" src="/images/logo.png" />
            </div>
            <form>
              <h4>Log In</h4>
              <div className="input-group">
                <input placeholder="username" />
              </div>
              <div className="input-group">
                <input placeholder="password" />
              </div>
            </form>
            <div style={{fontStyle: "italic", margin: "20px 0"}}>- or -</div>
            <a href="#" className="button accent">Sign Up</a>
          </div>
        </div>

        {/*
        <div className="logo">
          <span className="lecture-viewer">
            lecture
            <span className="viewer">
              viewer
            </span>
          </span>
          <span className="line"/>
          <img src={logo}/>
        </div>
        <form onSubmit={this.handleLogin}
              noValidate="novalidate">
          <button type="submit">
            Login
          </button>
          <input type="email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={e => this.handleChange(e, "email")}
                 required="required"/>
          <input type="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={e => this.handleChange(e, "password")}
                 required="required"/>
        </form>
        <button>
          Sign Up
        </button>
      */}
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default connect(() => {
  return ({});
}, dispatch => {
  return bindActionCreators({
    onLogin: login
  }, dispatch);
})(Login);
