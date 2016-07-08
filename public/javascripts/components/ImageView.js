"use strict";

import React from "react";

export default class ImageView extends React.Component {
  render() {
    return (
      <div className="imageContainer">
        <img src={this.props.image}/>
      </div>
    );
  }
}

ImageView.propTypes = {
  image: React.PropTypes.string.isRequired
};