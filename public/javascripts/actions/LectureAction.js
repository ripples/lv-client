"use strict";

/**
 * Lecture Actions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {LectureConstants} from "../constants/LectureConstants";
import {fetchLectures} from "../API";

class LectureActions {
  /**
   * Fetch lectures for user
   * @param {string} _jwt - Auth token
   */
  fetch(_jwt) {
    fetchLectures({
      jwt: _jwt,
      callback: (err, lectures) => {
        if (err) {
          throw err;
        }
        AppDispatcher.dispatch({
          actionType: LectureConstants.FETCH_LECTURES,
          lectures: lectures
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
      actionType: LectureConstants.FILTER,
      classname: classname
    });
  }

  /**
   * Launch LectureView component
   * @param {object} lecture - lecture object
   */
  view(lecture) {
    AppDispatcher.dispatch({
      actionType: LectureConstants.VIEW,
      lecture: lecture
    });
  }

  /**
   * Hide LectureView component
   */
  hide() {
    AppDispatcher.dispatch({
      actionType: LectureConstants.HIDE
    });
  }
}

const lectureActions = new LectureActions();

export default lectureActions;
