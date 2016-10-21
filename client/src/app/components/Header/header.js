import React from "react";
import {Link} from "react-router";
import Logo from "components/Logo/logo";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to="/"><Logo /></Link>
      </div>
    );
  }
}

export default Header;
