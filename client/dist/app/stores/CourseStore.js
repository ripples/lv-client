"use strict";

/*
 * CourseStore
 */

import EventEmitter from "events";
import * as Immutable from "immutable";

import appDispatcher from "../dispatcher/AppDispatcher";
import {CourseConstants} from "../constants/CourseConstants";
import ErrorConstants from "../constants/ErrorConstants";
const CHANGE_EVENT = "change";

class CourseStore extends EventEmitter {
  constructor() {
    super();
    this._courses = [];
    this._searchResults = [];
  }
  
  /**
   * Create the courses array
   * @param  {Array.<Object>} courses The array of courses
   */
  set(courses) {
    this._courses = Immutable.fromJS(courses.reduce((courses, course) => {
      // convert all raw dates to date Objects
      course.startDtm = new Date(course.startDtm);
      course.endDtm = new Date(course.endDtm);
      // make sure all are displayed
      course.display = true;
      course.lectures = course.lectures.reduce((lectures, lecture) => {
        lectures[lecture] = null;
        return lectures;
      }, {});
      // It's fine that we store the id in both key and value, will be resolved later
      courses[course.id] = course;
      return courses;
    }, {}));
  }
  
  /**
   * TODO: Will be deprecated, need to move to LectureStore
   * Update courses array with lecture data
   * @param {String} courseId - course to update
   * @param {Array.<Object>} lectures - list of lecture objects
   */
  updateCourse(courseId, lectures) {
    // TODO use withMutations
    lectures.forEach(lecture => {
      this._courses = this._courses.updateIn([courseId, "lectures", lecture.name], () => {
        let lectureData = lecture.data;
        lectureData.lectureName = lecture.name;
        return lectureData;
      });
    });
  }
  
  /**
   * Get the courses the user has access to
   * @return {array} - courses list
   */
  getCourses() {
    return this._courses.toJSON();
  }
  
  populateResults(data) {
    this._searchResults = data;
  }
  
  /**
   * @returns {Array} - results from the search
   */
  getSearchResult() {
    return this._searchResults.toJSON();
  }
  
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  
  /**
   * emit the errors related to the Courses
   * @param {string} errorType - the error received
   */
  emitError(errorType) {
    switch (errorType) {
      default: {
        this.emit(ErrorConstants.UNEXPECTED_ERROR);
        break;
      }
    }
  }
  
  /**
   * @param {function} callback - called on event change
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
  /**
   * @param {function} callback - to be removed from event
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const courseStore = new CourseStore();

// Register callback to handle all updates
appDispatcher.register(action => {
  switch (action.actionType) {
    case CourseConstants.FETCH_COURSES: {
      const courses = action.courses;
      courseStore.set(courses);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.FETCH_LECTURES: {
      const courseData = action.courseData;
      courseStore.updateCourse(courseData.courseId, courseData.lectures);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.FETCH_SEARCH_RESULTS: {
      const searchResults = action.data;
      courseStore.set(searchResults);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.ERROR: {
      courseStore.emitError(action.errorType);
      break;
    }
    default:
    // no op
  }
});

export default courseStore;
