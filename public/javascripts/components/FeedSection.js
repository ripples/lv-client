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
import {withRouter} from "react-router";

class FeedSection extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: {},
      renderedCourses: {},
      searchFilters: {
        semester: null,
        keywords: []
      },
      semesterOptions: {
        current: "CUR",
        past: "PAST",
        all: "*"
      }
    };
    // FIXME: need to get the current semester someother way
    this.CUR_SEMESTER = "S16";
    // TODO: replace binding with ES7 decorator https://github.com/andreypopp/autobind-decorator
    this.onCourseChangeListener = this.onCourseChangeListener.bind(this);
  }
  
  onCourseChangeListener() {
    this.setState(
      {
        courses: courseStore.getCourses(),
        renderedCourses: courseStore.getCourses()
      }, this._setSearchFilters.bind(this, this.state.searchFilters));
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
          <SideBar setSearchFilters={this._setSearchFilters.bind(this)} semesterOptions={this.state.semesterOptions}/>
          <CourseList courses={this.state.renderedCourses}/>
        </div>
      </div>
    );
  }
  
  /**
   * method to pass to the course list list in order to filter the courses
   * @param {object} filters - object whit the semester to filter and the keywords:
   * filters structure:
   * {
   *    keywords:[],
   *    semester: string
   * }
   * @private
   */
  _setSearchFilters(filters) {
    let filteredCourses = {};
    let courseList = this.state.courses;
    let keys = Object.keys(courseList);
    let semOpt = this.state.semesterOptions;
    // select the courses based on the semester choice
    switch (filters.semester) {
      case semOpt.current: {
        keys.forEach(key=> {
          if (courseList[key].semester === this.CUR_SEMESTER) {
            filteredCourses[key] = courseList[key];
          }
        });
        break;
      }
      case semOpt.past: {
        keys.forEach(key=> {
          if (courseList[key].semester !== this.CUR_SEMESTER) {
            filteredCourses[key] = courseList[key];
          }
        });
        break;
      }
      case semOpt.all: {
        filteredCourses = courseList;
        break;
      }
      default: {
        filteredCourses = courseList;
        break;
      }
    }
    courseList = {};
    // filters the courses by the keywords added
    if (Array.isArray(filters.keywords) && filters.keywords.length > 0) {
      Object.keys(filteredCourses).forEach(course=> {
        let aux = filteredCourses[course];
        filters.keywords.forEach(word=> {
          if (aux.name.search(word) !== -1 || aux.description.search(word) !== -1 ||
            aux.prof.search(word) !== -1 || aux.profEmail.search(word) !== -1 ||
            aux.semester.search(word) !== -1 || aux.startDtm.search(word) !== -1 ||
            aux.endDtm.search(word) !== -1) {
            courseList[course] = filteredCourses[course];
          }
        });
      });
      this.setState({renderedCourses: courseList, searchFilters: filters});
      return;
    }
    this.setState({renderedCourses: filteredCourses, searchFilters: filters});
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
