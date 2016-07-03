"use strict";

import React from "react";

import LowerMediaContainer from "./LowerMediaContainer";
import MediaComponent from "./MediaComponent";

export default class MainMediaContainer extends React.Component {
  render() {
    return (
      <div className="MainMediaWrapper">
        <div className="PrimaryMedia">
          <div width="100%">
            <MediaPage media={this.props.MainMedia}/>
          </div>
        </div>
        <LowerMediaContainer elements={this.props.LowerMedia}/>
      </div>
    );
  }
}