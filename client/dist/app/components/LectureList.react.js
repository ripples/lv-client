"use strict";

/**
 * LectureList will have one sub-class of Lecture
 * This design will allow for the cascading of stateful class
 * information to update the views in LectureList, as well
 * as a searchbox, eventually.
 *
 * This class also implements the use of DialogBox for viewing
 * Lectures.
 *
 **/

import React from "react";

import Lecture from "./Lecture.react";

export default class LectureList extends React.Component {
  render() {
    const lectureNodes = this.props.lectures.map((obj, index) => {
      if (obj.display) {
        return (
          <Lecture key={index} lecture={obj}>
          </Lecture>
        );
      }
      return null;
    });
    return (
      <div className="LectureList">
        {lectureNodes}
      </div>
    );
  }
}

