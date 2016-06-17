"use strict";

/**
 * Module to contain the behavior for the "Feed" view
 * This will consist of :
 *   "LectureFeed" module to show all Lectures
 *   "CourseList" module to show courses, allowing to filter
 *   "LectureView" module to view individual lectures
 **/

import React from "react";

import CourseList from "./CourseList.react";
import courseStore from "../stores/CourseStore";
import courseAction from "../actions/CourseAction";

export default class FeedSection extends React.Component {
  constructor() {
    super();
    this.state = {lectures: [], courses: []};
    // TODO: replace binding with ES7 decorator https://github.com/andreypopp/autobind-decorator
    this.onCourseChangeListener = this.onCourseChangeListener.bind(this);
  }

  onCourseChangeListener() {
    this.setState(
      {
        courses: courseStore.getCourses()
      });
  }

  componentDidMount() {
    courseStore.addChangeListener(this.onCourseChangeListener);
    courseAction.fetchCourses();
  }

  componentWillUnmount() {
    courseStore.removeChangeListener(this.onCourseChangeListener);
  }

  render() {
    return (
      <div className="FeedViewWrapper">
        <CourseList courses={this.state.courses}/>
      </div>
    );
  }
}
