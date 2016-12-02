"use strict";

import React, {PropTypes, Component} from "react";

import {requestResetEmail} from "libs/auth";
import FormError from "components/FormError/formError";

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailSent: false,
      error: null
    };
  }

  handleReset(e) {
    e.preventDefault();
    requestResetEmail(this.state.email).then(() => {
      this.setState({emailSent: true});
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
    const success = <div>Successfully sent email to {this.state.email}</div>;
    const resetForm = (
      <div>
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
        <button
          onClick={this.props.onLoginForm}
          className="button accent outline">
          Back
        </button>
      </div>
    );
    return (
      this.state.success ? success : resetForm
    );
  }
}

ForgotForm.propTypes = {
  onLoginForm: PropTypes.func.isRequired
};

export default ForgotForm;

