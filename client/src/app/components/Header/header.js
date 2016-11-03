import React from "react";
import {Link} from "react-router";
import Logo from "components/Logo/logo";

import {logout} from "libs/auth";

class Header extends React.Component {
  doLogout() {
    logout();
    this.context.router.push("/login");
  }

  render() {
    return (
      <div className="header">
        <div className="left">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="right">
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
