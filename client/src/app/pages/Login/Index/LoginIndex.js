"use strict";

import React, {PropTypes, Component} from "react";
import {Link, withRouter} from "react-router";

import {login} from "../../../libs/auth";
import FormError from "../../../components/FormError/formError";
import {handleChange} from "../../../utils/react";

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
      this.props.router.push("/");
    }).catch(err => {
      this.setState({error: err.response.data.error});
    });
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
              onChange={e => handleChange(this, e, "email")}
              required="required"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={e => handleChange(this, e, "password")}
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
        <div style={{fontStyle: "italic", margin: "16px 0", fontSize: "14px"}}>- or -</div>
        <a href="#" className="button accent">Sign Up</a>
        <Link to="/forgot" className="forgot">forgot your password?</Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(LoginForm);
