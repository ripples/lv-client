"use strict";

import React, {PropTypes, Component} from "react";
import {isEmail} from "validator";

import {requestResetEmail} from "../../libs/auth";
import FormError from "../../components/FormError/formError";

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false,
      error: null
    };
  }

  handleReset(e) {
    e.preventDefault();
    if (!isEmail(this.state.email)) {
      return this.setState({error: "You must provide a valid email."});
    }
    requestResetEmail(this.state.email).then(() => {
      this.setState({success: true});
    }).catch(err => {
      this.setState({error: err.payload.error});
    });
  }

  handleChange(e, field) {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {[field]: e.target.value}));
  }

  buildFormErrorIfNecessary() {
    return this.state.error ? <FormError error={this.state.error}/> : null;
  }

  buildSuccessOrResetForm(error) {
    if (this.state.success) {
      return (
        <div>
          If the email
          <br/>
          <strong>{this.state.email} </strong>
          <br/>
          is registered, it will receive a password reset link
        </div>
      );
    }
    return (
      <form onSubmit={e => this.handleReset(e)}
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
        {error}
        <button
          type="submit"
          disabled={!this.state.email}
          className="button accent outline">
          Send Email
        </button>
      </form>
    );
  }

  render() {
    const error = this.buildFormErrorIfNecessary();
    const form = this.buildSuccessOrResetForm(error);

    return (
      <div>
        {form}
        <button
          onClick={this.props.onLoginForm}
          className="button accent outline">
          Login
        </button>
      </div>
    );
  }
}

ForgotForm.propTypes = {
  onLoginForm: PropTypes.func.isRequired
};

export default ForgotForm;

