"use strict";

/**
 * Lecture Actions
 */

import appDispatcher from "../dispatcher/AppDispatcher";
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
          const message = String(err.err.message);
          appDispatcher.dispatch({
            actionType: CourseConstants.ERROR,
            errorType: message
          });
        }
        appDispatcher.dispatch({
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
        const message = String(err.err.message);
        appDispatcher.dispatch({
          actionType: CourseConstants.ERROR,
          errorType: message
        });
      }
      appDispatcher.dispatch({
        actionType: CourseConstants.FETCH_LECTURES,
        courseData: {
          courseId: courseId,
          lectures: lectures
        }
      });
    });
  }

  /**
   * fetches the result of the search of lectures
   * @param {String} searchContent - Search content
   */
  fetchSearchResult(searchContent) {
    api.fetchSearchResults({
      searchContent,
      callback: (err, result)=> {
        if (err) {
          const message = String(err.err.message);
          appDispatcher.dispatch({
            actionType: CourseConstants.ERROR,
            errorType: message
          });
        }
        appDispatcher.dispatch({
          actionType: CourseConstants.FETCH_SEARCH_RESULTS,
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
    appDispatcher.dispatch({
      actionType: CourseConstants.FILTER,
      classname: classname
    });
  }

  /**
   * Open and load course card
   * @param {String} courseId - course id
   */
  view(courseId) {
    appDispatcher.dispatch({
      actionType: CourseConstants.VIEW,
      courseId: courseId
    });
  }

  /**
   * Hide LectureView component
   */
  hide() {
    appDispatcher.dispatch({
      actionType: CourseConstants.HIDE
    });
  }
}

const courseAction = new CourseAction();

export default courseAction;
