"use strict";

/**
 * Module to contain the behavior for the "Feed" view
 * This will consist of :
 *   "LectureFeed" module to show all Lectures
 *   "ClassList" module to show classes, allowing to filter
 *   "LectureView" module to view individual lectures
 **/

import React from "react";

import ClassList from "./ClassList.react";
import LectureList from "./LectureList.react";
import lectureStore from "../stores/LectureStore";
import lectureActions from "../actions/LectureAction";

export default class FeedSection extends React.Component {
  constructor() {
    super();
    this.state = {lectures: [], classes: []};
  }

  onLectureChangeListener() {
    this.setState(
      {
        lectures: lectureStore.getLectures(),
        classes: lectureStore.getCourses()
      });
  }

  componentDidMount() {
    lectureStore.addChangeListener(this.onLectureChangeListener);
    lectureActions.fetch(this.props.jwt);
  }

  componentWillUnmount() {
    lectureStore.removeChangeListener(this.onLectureChangeListener);
  }

  render() {
    return (
      <div className="FeedViewWrapper">
        <ClassList classes={this.state.classes}/>
        <LectureList lectures={this.state.lectures}/>
      </div>
    );
  }
}
