"use strict";

/**
 * Lecture Actions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {CourseConstants} from "../constants/CourseConstants";
import {LectureConstants} from "../constants/LectureConstants";
import {fetchCourses} from "../API";

class CourseAction {
  /**
   * Fetch lectures for user
   * @param {string} _jwt - Auth token
   */
  fetch(_jwt) {
    fetchCourses({
      jwt: _jwt,
      callback: (err, courses) => {
        if (err) {
          throw err;
        }
        AppDispatcher.dispatch({
          actionType: CourseConstants.FETCH_COURSES,
          courses: courses
        });
        courses.forEach(course => {
          AppDispatcher.dispatch({
            actionType: LectureConstants.FETCH_LECTURES,
            lectures: course.lectures
          });
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
