"use strict";

import React, {PropTypes, Component} from "react";

import {resetPassword} from "../../libs/auth";
import FormError from "../../components/FormError/formError";

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordConfirm: "",
      reset: false,
      error: null
    };
  }

  handleReset(e) {
    e.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      return this.setState(Object.assign({}, this.state, {error: "Passwords do not match."}));
    }
    resetPassword(this.props.token, this.state.password).then(() => {
      this.setState({reset: true});
    }).catch(err => {
      this.setState({error: err.payload.error});
    });
  }

  handleChange(e, field) {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {[field]: e.target.value}));
  }

  render() {
    const error = this.state.error ? <FormError error={this.state.error}/> : null;

    if (this.state.reset) {
      return (
        <div>
          Password successfully reset.
          <a href="#" className="button accent" onClick={this.props.onLoginForm}>Login</a>
        </div>
      );
    }

    return (
      <form onSubmit={e => this.handleReset(e)}
            noValidate="novalidate">
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.handleChange(e, "password")}
            required="required"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.passwordConfirm}
            onChange={e => this.handleChange(e, "passwordConfirm")}
            required="required"
          />
        </div>
        {error}
        <button
          type="submit"
          disabled={!(this.state.password && this.state.passwordConfirm)}
          className="button accent outline">
          Submit
        </button>
      </form>
    );
  }
}

ResetForm.propTypes = {
  onLoginForm: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetForm;
