"use strict";

/**
 * Module to contain the behavior for the "Feed" view
 * This will consist of :
 *   "LectureFeed" module to show all Lectures
 *   "CourseList" module to show courses, allowing to filter
 *   "LectureView" module to view individual lectures
 **/

import React from "react";

import CourseList from "./CourseList";
import courseStore from "../stores/CourseStore";
import courseAction from "../actions/CourseAction";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import {withRouter} from 'react-router';

class FeedSection extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: {}
    };
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
      <div className="FeedSection inheritProps container-fluid">
        <SearchBar courses={this.state.courses}/>
        <div className="container-fluid feedSection">
          <SideBar/>
          <CourseList courses={this.state.courses}/>
        </div>
      </div>
    );
  }
}
let DecorateFeedSection = withRouter(FeedSection);
export default DecorateFeedSection;

// PropTypes
FeedSection.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
