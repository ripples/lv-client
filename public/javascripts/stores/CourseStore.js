"use strict";

/*
 * CourseStore
 */

import EventEmitter from "events";
import * as Immutable from "immutable";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {CourseConstants} from "../constants/CourseConstants";

const CHANGE_EVENT = "change";

let _courses = [];
let _searchResults = [];

/**
 * Create the courses array
 * @param  {Array.<Object>} courses The array of courses
 */
function set(courses) {
  _courses = Immutable.fromJS(courses.reduce((courses, course) => {
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
function updateCourse(courseId, lectures) {
  lectures.forEach(lecture => {
    _courses = _courses.updateIn([courseId, "lectures", lecture.name], () => lecture.data);
  });
}
function populateResults(data) {
  _searchResults = data;
}

class CourseStore extends EventEmitter {

  /**
   * Get the courses the user has access to
   * @return {array} - courses list
   */
  getCourses() {
    return _courses.toJSON();
  }

  /**
   * @returns {Array} - results from the search
   */
  getSearchResult(){
    return _searchResults;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
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
AppDispatcher.register(action => {
  switch (action.actionType) {
    case CourseConstants.FETCH_COURSES:
    {
      const courses = action.courses;
      set(courses);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.FETCH_LECTURES:
    {
      const courseData = action.courseData;
      updateCourse(courseData.courseId, courseData.lectures);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.FETCH_SEARCH_RESULT:
    {
      populateResults(action.data);
      courseStore.emitChange();
      break;
    }
    default:
    // no op
  }
});

export default courseStore;
