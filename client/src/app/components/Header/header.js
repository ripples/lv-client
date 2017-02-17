import React from "react";
import {Link} from "react-router";
import Logo from "components/Logo/logo";

class Header extends React.Component {
  doLogout() {
    this.context.router.push("/logout");
  }

  toInstructorPage() {
    // TODO check if admin...
    this.context.router.push("/instructor-settings");
  }

  render() {
    return (
      <div className="header">
        <div className="left">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="right">
          <button className="small" onClick={() => this.toInstructorPage()}>Instructor Settings</button>
          {
            (this.context.router.isActive("/login"))
              ? null : <button className="small" onClick={() => this.doLogout()}>Logout</button>
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
