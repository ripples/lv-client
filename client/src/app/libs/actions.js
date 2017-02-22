import {getCourses} from "./courses";

/**
 * Action to handle getting user's courses from the DB
 * TODO error handling.... .catch( error => {})
 * @return {Function} Function to dispatch the action to the reducer
 */
export function getCoursesAction() {
  return function(dispatch) {
    getCourses().then(
      response => {
        dispatch({
          type: "GET_COURSES_FULFILLED",
          payload: response.data
        });
      }
    );
  };
}

/**
 * Action to handle getting user's courses from the DB
 * TODO error handling.... .catch( error => {})
 * @param {number} newTime - new TimeStamp time
 * @return {function} to pass dispatch to
 */
export function updateVideoTimeStampAction(newTime) {
  return function(dispatch) {
    dispatch({
      type: "UPDATE_VIDEO_TIMESTAMP",
      payload: {
        newTime: newTime,
        image: "/media/F16/COMPSCI 460/08-26-2016--08-59-01/images/computer/full/computer-0-1472216342"
      }
    });
  };
}

