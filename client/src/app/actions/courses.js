"use strict";

import {getCourses as getCoursesRequest} from "../libs/courses";

/**
 * Action to handle getting user's courses from the DB
 * TODO error handling.... .catch( error => {})
 * @return {Function} Function to dispatch the action to the reducer
 */
export function getCourses() {
  return dispatch => {
    return getCoursesRequest().then(response => {
      dispatch({
        type: "GET_COURSES",
        payload: response.data
      });
    });
  };
}
