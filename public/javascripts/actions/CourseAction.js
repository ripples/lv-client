"use strict";

/**
 * Lecture Actions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {CourseConstants} from "../constants/CourseConstants";
import * as api from "../API";

class CourseAction {
  /**
   * Fetch courses for user
   */
  fetchCourses() {
    api.fetchCourses({
      callback: (err, courses) => {
        if (err) {
          // TODO: error handler
          throw err;
        }
        AppDispatcher.dispatch({
          actionType: CourseConstants.FETCH_COURSES,
          courses: courses
        });
      }
    });
  }

  /**
   * Fetches list of lectures details
   * @param {String} courseId - course id
   * @param {Array.<String>} lectures - list of lectures fetching
   */
  fetchLectures(courseId, lectures) {
    api.fetchLectures({
      courseId: courseId,
      lectures: lectures,
      callback: (err, lectures) => {
        if (err) {
          // TODO: error handler;
          throw err;
        }
        AppDispatcher.dispatch({
          actionType: CourseConstants.FETCH_LECTURES,
          courseData: {
            courseId: courseId,
            lectures: lectures
          }
        });
      }
    });
  }

  /**
   * Filter the lecture feed to display/not display a given class
   * @param  {string} classname - The name of the class to filter in/out
   */
  filter(classname) {
    AppDispatcher.dispatch({
      actionType: CourseConstants.FILTER,
      classname: classname
    });
  }

  /**
   * Open and load course card
   * @param {String} courseId - course id
   */
  view(courseId) {
    AppDispatcher.dispatch({
      actionType: CourseConstants.VIEW,
      courseId: courseId
    });
  }

  /**
   * Hide LectureView component
   */
  hide() {
    AppDispatcher.dispatch({
      actionType: CourseConstants.HIDE
    });
  }
}

const courseAction = new CourseAction();

export default courseAction;
