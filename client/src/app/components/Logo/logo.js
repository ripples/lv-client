import React from "react";

class Logo extends React.Component {
  render() {
    return (
      <span className="logo" style={{fontFamily: "'Lato', sans-serif", fontSize: this.props.size || "16px"}}>
        <span>lecture</span><span style={{fontWeight: "bold"}}>viewer</span>
      </span>
    );
  }
}

Logo.propTypes = {
  size: React.PropTypes.string
};

export default Logo;
