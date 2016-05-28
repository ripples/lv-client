var LoginForm = React.createClass({
    login : function(data){
        $.ajax({
            url : this.props.loginURL,
            contentType: 'application/json',
            type : 'POST',
            data : JSON.stringify(data), //lvadmin/lvadmin
            success : function(data){
                // for now, use the webtoken as URL
                console.log(window.location.host+ this.props.loginURL + data.token);
                // window.location += (this.props.loginURL + data.token);
            }.bind(this),
            error : function(xhr, status, err) {
                console.log(err);
                if (status.value == "Bad Request" || "Unauthorized")
                    this.setState({prompt : "Invalid Email/Password"});
            }.bind(this)
        });
    },
    handleOnSubmit : function(e){
        e.preventDefault();
        var email = React.findDOMNode(this.refs.email).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        if (!email || !password){
            // TODO : Add reminder to highlight unfilled fields
            this.setState({prompt : "Please enter Email and Password."});
            return;
        }
        this.setState({prompt : ""});
        this.login({"email" : email, "password" : password});
    },
    getInitialState : function(){
        return {prompt : ""};
    },
    render : function(){
        return (
            <form className="loginForm" onSubmit={this.handleOnSubmit}>
              <p className="prompt">{this.state.prompt}</p>
                 <input type = "text" placeholder="Email" ref="email" />
                 <br />
                 <input type = "password" placeholder="Password" ref = "password" />
                 <input type="submit" value = "Login" />
               </form>
			)
    }
});


// Class to represent one class. Basically a Name component
var Class = React.createClass({
    render : function(){
        return(
           <div className = "classContainer">

            <h4 className = "classHeader">
              {this.props.classname}
            </h4>
           </div>
        )
    }
});
// React
var ClassList = React.createClass({});
// Displays Lecture "feed" where
var LectureFeed = React.createClass({});
function init(){
    React.render(
        <LoginForm loginURL = "http://present.cs.umass.edu:9000/api/auth"/>,
        document.getElementById('loginFormContainer')
    );
    React.render(

    );
}
init();
