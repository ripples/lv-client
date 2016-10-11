import React from "react";
import Logo from "components/Logo/logo";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Logo />
      </div>
    );
  }
}

export default Header;
