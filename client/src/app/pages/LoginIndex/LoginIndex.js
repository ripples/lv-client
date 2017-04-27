"use strict";

import React, {PropTypes, Component} from "react";
import {withRouter} from "react-router";
import {login} from "../../libs/auth";
import FormError from "../../components/FormError/formError";
import {handleChange} from "../../utils/react";

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
          <div className="input-divider"></div>
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
            className="button accent outline login">
            LOG IN
          </button>
        </form>
        <a href="#" className="button accent">SIGN UP</a>
      </div>
    );
  }
}

LoginForm.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(LoginForm);
