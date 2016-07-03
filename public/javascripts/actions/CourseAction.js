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
   * @param {String} semester - semester
   * @param {String} courseId - course id
   * @param {Array.<String>} lectures - list of lectures fetching
   */
  fetchLectures(semester, courseId, lectures) {
    api.fetchLectures(semester, courseId, lectures, (err, lectures) => {
      if (err) {
        // TODO: error handler
        throw err;
      }
      AppDispatcher.dispatch({
        actionType: CourseConstants.FETCH_LECTURES,
        courseData: {
          courseId: courseId,
          lectures: lectures
        }
      });
    });
  }

  /**
   * fetches the result of the serach of lectures
   * @param {String} searchContent
   */
  fetchSearchResult(searchContent) {
    api.fetchSearchResults({
      searchContent,
      callback: (err, result)=> {
        if (err) {
          // TODO: error handler
          throw err;
        }
        console.log(result);
        AppDispatcher.dispatch({
          type: CourseConstants.FETCH_SEARCH_RESULT,
          data: result
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
