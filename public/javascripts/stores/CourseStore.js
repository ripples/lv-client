"use strict";

/*
 * CourseStore
 */

import EventEmitter from "events";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {CourseConstants} from "../constants/CourseConstants";

const CHANGE_EVENT = "change";

let _courses = [];

/**
 * Create the courses array
 * @param  {Array.<Object>} courses The array of courses
 */
function set(courses) {
  _courses = courses;
  _courses.forEach(course => {
    // convert all raw dates to date Objects
    course.startDtm = new Date(course.startDtm);
    course.endDtm = new Date(course.endDtm);
    // make sure all are displayed
    course.display = true;
    course.lectures = course.lectures.reduce((lectures, lecture) => {
      lectures[lecture] = null;
      return lectures;
    }, {});
  });
}

/**
 * TODO: Will be deprecated, need to move to LectureStore
 * Update courses array with lecture data
 * @param {String} courseId - course to update
 * @param {Array.<Object>} lectures - list of lecture objects
 */
function updateCourse(courseId, lectures) {
  const course = _courses.find(course => course.id === courseId);
  course.lectures.forEach(lecture => {
    lectures[lecture.name] = lecture.data;
  });
}

class CourseStore extends EventEmitter {

  /**
   * Get the courses the user has access to
   * @return {array} - courses list
   */
  getCourses() {
    return _courses;
  }

  getLectures(courseId) {
    return _courses[courseId].lectures;
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
    case CourseConstants.FETCH_COURSES: {
      const courses = action.courses;
      set(courses);
      courseStore.emitChange();
      break;
    }
    case CourseConstants.FETCH_LECTURES: {
      const courseData = action.courseData;
      updateCourse(courseData.courseId, courseData.lectures);
      courseStore.emitChange();
    }
    default:
    // no op
  }
});

export default courseStore;
