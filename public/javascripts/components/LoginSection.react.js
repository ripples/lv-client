/**
  * LoginSection is a class to encapsulate login functionality
  * in the "View" component of the Flux/React design
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;
var LoginAction = require('../actions/LoginAction');

var LoginSection = React.createClass({

  getInitialState : function() {
    return {
      prompt : "",
      email : "",
      password : ""
    };
  },

  login : function(data) {
    LoginAction.login(data);
  },

  handleOnSubmit : function(e) {
      e.preventDefault();
      var email = this.refs.email.getDOMNode().value.trim();
      var password = this.refs.password.getDOMNode().value.trim();

      if (!email || !password){
        // TODO : Add reminder to highlight unfilled fields
        this.setState({prompt : "Please enter Email and Password."});
        return;
      }
      this.setState({prompt : ""});
      this.login({"email" : email, "password" : password});
  },

  /**
   * @return {object}
   */
  render : function() {
    return (
      <form className="loginForm" onSubmit={this.handleOnSubmit}>
        <p className="prompt">{this.state.prompt}</p>
        <input type  = "text" placeholder="Email" ref="email" />
        <br />
        <input type = "password" placeholder="Password" ref = "password" />
        <input type="submit" value = "Login" />
      </form>
    );
  }

});

module.exports = LoginSection;
