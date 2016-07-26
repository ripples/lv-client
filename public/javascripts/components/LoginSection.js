"use strict";

/**
 * LoginSection is a class to encapsulate login functionality
 * in the "View" component of the Flux/React design
 **/

import React from "react";
import {withRouter} from "react-router";
import SweetAlert from "sweetalert-react";
import {AlertMessages, AlertTitles, AlertTypes} from "../utils/AlertMessages"

import {Button, Col, Row} from "react-bootstrap"

import loginActions from "../actions/LoginAction";

class LoginSection extends React.Component {
  constructor() {
    super();
    this.state = {
      prompt: "",
      email: "",
      password: "",
      show: false,
      alertOptions: this._getAlertOptions()
    };
  }
  
  /**
   * performs the login action
   * @param {object} data - login parameters
   */
  login(data) {
    loginActions.login(data);
  }
  
  //TODO: cleanup
  render() {
    return (
      <div>
        <div className="container-fluid ">
          <Col sm={6} className="col-sm-offset-3 login-form">
            <form id="login-form" className="form-horizontal well well-lg loginForm"
                  onSubmit={this._handleOnSubmit.bind(this)}>
              <p className="prompt">{this.state.prompt}</p>
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input defaultValue="test-student1@email.com" type="email" className="form-control"
                       placeholder="Email" ref={email => this._email = email}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" className="form-control"
                       ref={(password)=>this._password = password}/>
              </div>
              <Button type="submit" bsStyle="danger">Login</Button>
            </form>
          </Col>
        </div>
        <SweetAlert show={this.state.show} {...this.state.alertOptions} />
      </div>
    );
  }
  
  /**
   * handle the submit action
   * @param {object} e - submition event
   * @private
   */
  _handleOnSubmit(e) {
    e.preventDefault();
    const email = this._email.value;
    const password = this._password.value;
    
    if (!email || !password) {
      this.setState({
        show: true,
        alertOptions: {
          title: AlertTitles.loginEmailWarning,
          text: AlertMessages.emptyLoginEmail,
          type: AlertTypes.warning,
          onConfirm: ()=> {
            this.setState({show: false})
          }
        }
      });
      return;
    }
    this.login({"email": email, "password": password});
  }
  
  _getAlertOptions() {
    return {
      title: "",
      onConfirm: ()=> {
        this.setState({show: false})
      }
    }
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
