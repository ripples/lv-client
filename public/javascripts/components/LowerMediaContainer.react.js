"use strict";

import React from "react";

import MediaComponent from "./MediaComponent.react";


export default class LowerMediaContainer extends React.Component {
  build(elem) {
    if (elem.map) { // check if an array was passed
      const widthPercent = Math.floor((100 / elem.length)).toString() + "%";
      const style = {
        width: widthPercent,
        height: "100%",
        float: "left"
      };
      return elem.map((mediaObj, index) => {
        return (
          <div key={index} style={style}>
            <MediaPage media={mediaObj}/>
          </div>
        );
      });
    } else if (this.elem) {
      return (
        <div style={{width: "100%", height: "20%", alright : "center"}}>
          <MediaPage media={elem}/> // return the one element passed
        </div>
      );
    }
    return null; // return nothing, there is nothing to show.
  }

  render() {
    return (
      <div className="LowerMediaContainer">
        {this.build(this.props.elements)}
      </div>
    )
  }
}