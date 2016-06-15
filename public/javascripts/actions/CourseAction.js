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
   * @param {string} _jwt - Auth token
   */
  fetchCourses(_jwt) {
    api.fetchCourses({
      jwt: _jwt,
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

  fetchLectures(_jwt, courseId) {
    api.fetchLectures({
      jwt: _jwt,
      courseId: courseId,
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
   * Launch LectureView component
   * @param {object} lecture - lecture object
   */
  view(lecture) {
    AppDispatcher.dispatch({
      actionType: CourseConstants.VIEW,
      lecture: lecture
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
