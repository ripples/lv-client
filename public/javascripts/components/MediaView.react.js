"use strict";

/**
 * LectureView will allow a user to view a selected Lecture
 * It should REACT(lol) to an AppDispatcher dispatch, and will
 * disappear after the shading behind the box is clicked.
 *
 **/

import React from "react";

import MainMediaContainer from "./MainMediaContainer";

export default class MediaView extends React.Component {
  render() {
    const MediaCopy = this.props.media.slice();
    return (
      <div className="MediaView">
        <MainMediaContainer
          MainMedia={MediaCopy.splice(this.props.primary, 1)[0]}
          LowerMedia={MediaCopy}
        />
      </div>
    );
  }
}

