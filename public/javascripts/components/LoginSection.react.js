"use strict";

/**
 * LoginSection is a class to encapsulate login functionality
 * in the "View" component of the Flux/React design
 **/

import React from "react";

import loginActions from "../actions/LoginAction";

export default class LoginSection extends React.Component {
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

  render() {
    return (
      <form className="loginForm" onSubmit={this._handleOnSubmit.bind(this)}>
        <p className="prompt">{this.state.prompt}</p>
        <input type="text" placeholder="Email" ref={(email)=>this._email = email}/>
        <br />
        <input type="password" placeholder="Password" ref={(password)=>this._password = password}/>
        <input type="submit" value="Login"/>
      </form>
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
