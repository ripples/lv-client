"use strict";

/**
 * Lecture Actions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LectureConstants = require('../constants/LectureConstants');
import {fetchLectures} from '../API';

export default class LectureActions {
  /**
   * Fetch lectures for user
   * @param {string} _jwt - Auth token
   */
  static fetch(_jwt) {
    fetchLectures({
      jwt: _jwt,
      success : (lectures) => {
        AppDispatcher.dispatch({
          actionType: LectureConstants.FETCHLECTURES,
          lectures: lectures
        });
      }
    });
  }

  /**
   * Filter the lecture feed to display/not display a given class
   * @param  {string} classname - The name of the class to filter in/out
   */
  static filter(classname) {
    AppDispatcher.dispatch({
      actionType: LectureConstants.FILTER,
      classname: classname
    });
  }

  /**
   * Launch LectureView component
   * @param {TODO:MAKESCHEMA} lecture object
   */
  static view(lecture) {
    AppDispatcher.dispatch({
      actionType: LectureConstants.VIEW,
      lecture : lecture
    });
  }

  /**
   * Hide LectureView component
   */
  static hide(){
    AppDispatch.dispatch({
      actionType: LectureConstants.HIDE
    });
  }
}
