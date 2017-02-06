import React from "react";

class InputThumbnail extends React.Component {
  render() {
    return (
      <div className="thumbnail">
        <div className="thumb">
          <img src="https://i.imgur.com/4mXH4XM.jpg"/>
        </div>
      </div>
    );
  }
}

InputThumbnail.propTypes = {};

export default InputThumbnail;
