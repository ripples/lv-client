import React from "react";

/**
 * Institution Logo
 */
class Logo extends React.Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <span className="logo" style={{fontFamily: "'Lato', sans-serif", fontSize: this.props.size || "16px"}}>
        <span>lecture</span><span style={{fontWeight: "bold"}}>viewer</span>
      </span>
    );
  }

  /**
   * propTypes Declaration
   * @property {string} size Size of the logo
   */
  static get propTypes() {
    return {
      size: React.PropTypes.string
    };
  }
}

export default Logo;
