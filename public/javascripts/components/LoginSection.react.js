var React = require('react');
var ReactPropTypes = React.PropTypes;
var LoginActions = require('../actions/LoginAction');

var LoginSection = React.createClass({

  getInitialState : function() {
    return {
      prompt : "",
      username : "",
      password : ""
    };
  },

  login : function(data) {
    $.ajax({
      url : "http://present.cs.umass.edu:9000/api/auth",
      contentType: 'application/json',
      type : 'POST',
      data : JSON.stringify(data), //lvadmin/lvadmin
      success : function(data){
        console.log(data.token);
        LoginActions.login(data.token);
      }.bind(this),
      error : function(xhr, status, err) {
        console.error(this.props.loginURL, status, err.toString());
      }.bind(this)
    });
  },

  handleOnSubmit : function(e) {
      e.preventDefault();
      var username = this.refs.username.getDOMNode().value.trim();
      var password = this.refs.password.getDOMNode().value.trim();

      if (!username || !password){
        // TODO : Add reminder to highlight unfilled fields
        this.setState({prompt : "Please enter Username and Password."})
        return;
      }
      this.setState({prompt : ""});
      this.login({"username" : username, "password" : password});
  },

  /**
   * @return {object}
   */
  render : function() {
    return (
      <form className="loginForm" onSubmit={this.handleOnSubmit}>
        <p className="prompt">{this.state.prompt}</p>
        <input type = "text" placeholder="Username" ref="username" />
        <br />
        <input type = "password" placeholder="Password" ref = "password" />
        <input type="submit" value = "Login" />
      </form>
    );
  }

});

module.exports = LoginSection;
