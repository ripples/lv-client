"use strict";

/**
 * LoginSection is a class to encapsulate login functionality
 * in the "View" component of the Flux/React design
 **/

import React from "react";
import {withRouter} from "react-router";
import loginActions from "../actions/LoginAction";

class LoginSection extends React.Component {
  constructor() {
    super();
    this.state = {
      prompt: "",
      email: "",
      password: ""
    };
  }

  login(data) {
    loginActions.login(data);
  }

  //TODO: cleanup
  render() {
    return (
      <div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 login-form">
              <form id="login-form" className="form-horizontal well well-lg loginForm"
                    onSubmit={this._handleOnSubmit.bind(this)}>
                <p className="prompt">{this.state.prompt}</p>
                <div className="form-group">
                  <label for="login">Login</label>
                  <input defaultValue="test-student1@email.com" type="email" className="form-control"
                         placeholder="Email" ref={email => this._email = email}/>
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" placeholder="Password" className="form-control"
                         ref={(password)=>this._password = password}/>
                </div>
                <button type="submit" className="btn btn-danger">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _handleOnSubmit(e) {
    e.preventDefault();
    const email = this._email.value;
    const password = this._password.value;

    if (!email || !password) {
      // TODO : Add reminder to highlight unfilled fields
      this.setState({prompt: "Please enter Email and Password."});
      return;
    }

    this.setState({prompt: ""});
    this.login({"email": email, "password": password});
  }
}

const DecorateLoginSection = withRouter(LoginSection);
export default DecorateLoginSection;

// PropTypes
LoginSection.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
