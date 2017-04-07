import React from "react";
import {Link} from "react-router";
import Logo from "components/Logo/logo";

/**
 * Header bar object, should be on all pages
 */
class Header extends React.Component {
  /**
   * Logs the user out
   */
  doLogout() {
    this.context.router.push("/logout");
  }

  /**
   * Brings the user to the instructor-settings page
   */
  toInstructorPage() {
    // TODO check if Instructor...
    this.context.router.push("/instructor-settings");
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="header">
        <div className="left">
          <span></span>
          <Link to="/"><Logo size="20px"/></Link>
        </div>
        <div className="right">
          {
            (this.context.router.isActive("/login")) ? null : (
              <div>
                <button className="header-button" onClick={() => this.toInstructorPage()}>INSTRUCTOR SETTINGS</button>
                <button className="header-button" onClick={() => this.doLogout()}>LOGOUT</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }

  /**
   * contextTypes Declaration
   * @property {object} router Reference to React Router
   */
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
}
export default Header;
