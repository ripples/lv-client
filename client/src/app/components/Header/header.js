import React from "react";
import {Link} from "react-router";
import Logo from "components/Logo/logo";

class Header extends React.Component {
  doLogout() {
    this.context.router.push("/logout");
  }

  toInstructorPage() {
    // TODO check if Instructor...
    this.context.router.push("/instructor-settings");
  }

  render() {
    return (
      <div className="header">
        <div className="left">
          <span></span>
          <Link to="/">
            <Logo size="20px"/>
          </Link>
        </div>
        <div className="right">
          {
            (this.context.router.isActive("/login")) ? null : (
              <div>
                <button className="header-button" onClick={() => this.toInstructorPage()}>INSTRUCTOR SETTINGS</button>
                <button className="header-button" >
                  <Link to="/logout">
                    LOGOUT
                  </Link>
                </button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;
