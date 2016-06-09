/**
  * LoginSection is a class to encapsulate login functionality
  * in the "View" component of the Flux/React design
**/


import React from 'react' ;
var ReactPropTypes = React.PropTypes;


import LoginAction from'../actions/LoginAction';

export default class LoginSection extends React.Component{
    constructor(){
        super();
        this.state = {
            prompt : "",
            email : "",
            password : ""
        };
    }

    login (data) {
        LoginAction.login(data);
    }


    render () {
        return (
            <form className="loginForm" onSubmit={this._handleOnSubmit.bind(this)}>
                <p className="prompt">{this.state.prompt}</p>
                <input type  = "text" placeholder="Email" ref={(email)=>this._email = email} />
                <br />
                <input type = "password" placeholder="Password" ref = {(password)=>this._password = password} />
                <input type="submit" value = "Login" />
            </form>
        );
    }

    _handleOnSubmit (e) {
        e.preventDefault();
        let email = this._email.value;
        let password = this._password.value;

        if (!email || !password){
            // TODO : Add reminder to highlight unfilled fields
            this.setState({prompt : "Please enter Email and Password."});
            return;
        }
        this.setState({prompt : ""});
        this.login({"email" : email, "password" : password});
    }


}

/*var LoginSection = React.createClass({

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

  /!**
   * @return {object}
   *!/
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

module.exports = LoginSection;*/
