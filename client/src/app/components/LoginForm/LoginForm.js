"use strict";

import React, {PropTypes, Component} from "react";

import {login} from "libs/auth";
import FormError from "components/FormError/formError";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleLogin(e) {
    e.preventDefault();
    login(this.state.email, this.state.password).then(() => {
      this.props.onLogin();
    }).catch(err => {
      this.setState({error: err.payload.error});
    });
  }

  handleChange(e, field) {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {[field]: e.target.value}));
  }

  render() {
    const loginError = this.state.error ? <FormError error={this.state.error}/> : null;
    return (
      <div className="login-form">
        <form onSubmit={e => this.handleLogin(e)}
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
        <a href="#" className="forgot" onClick={this.props.onForgotForm}>Forgot your password?</a>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onForgotForm: PropTypes.func.isRequired
};

export default LoginForm;
