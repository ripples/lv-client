"use strict";

import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import {resetPassword} from "../../libs/auth";
import FormError from "../../components/FormError/formError";
import {handleChange} from "../../utils/react";

/**
 * Form to reset password
 */
class Reset extends Component {
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

    const token = this.props.location.query.token;
    resetPassword(token, this.state.password).then(() => {
      this.setState({reset: true});
    }).catch(err => {
      this.setState({error: err.error});
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const error = this.state.error ? <FormError error={this.state.error}/> : null;

    if (this.state.reset) {
      return (
        <div>
          Password successfully reset.
          <Link to="/login" className="button accent">Login</Link>
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
            onChange={e => handleChange(this, e, "password")}
            required="required"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.passwordConfirm}
            onChange={e => handleChange(this, e, "passwordConfirm")}
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

Reset.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Reset;
