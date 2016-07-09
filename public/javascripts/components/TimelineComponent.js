"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import ImageView from "./ImageView";
import {IMAGE_TYPES} from "../constants/MediaConstants";

export default class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._createThumbnails();
  }

  _createThumbnails() {
    let state = {};
    IMAGE_TYPES.forEach(type => {
      state[type] = this.props[type].map(imageUrl => {
        return <ImageView image={imageUrl} key={imageUrl}/>;
      });
    });
    return state;
  }

  render() {
    return (
      <div className="MediaComponent">
        {this.state.computer}
        {this.state.whiteboard}
      </div>
    );
  }
}

TimelineComponent.propTypes = {
  computer: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  whiteboard: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};
