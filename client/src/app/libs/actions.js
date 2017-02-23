import {getCourses} from "./courses";
import {getImages} from "./media";

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
 * @param {number} startTime - new TimeStamp time
 * @param {number} newTime - new TimeStamp time
 * @param {object} ids - ids for course and lecture
 * @return {function} to pass dispatch to
 */
export function updateVideoTimeStampAction(startTime, newTime, ids) {
  return function(dispatch) {
    getImages("F16", ids.courseId, ids.lectureId).then(
      response => {
        let currentTime = Number(startTime) + Number(newTime);
        let arr = response.data.computer[0];
        for (let x = 1; x < arr.length; x++) {
          let imageTime = Number(arr[x].split("-")[2]);
          let lastImageTime = Number(arr[x - 1].split("-")[2]);
          if (currentTime >= lastImageTime && currentTime < imageTime) {
            console.log("found a match, " + arr[x - 1]);
            dispatch({
              type: "UPDATE_VIDEO_TIMESTAMP",
              payload: {
                newTime,
                image: "/media/F16/" + ids.courseId + "/" + ids.lectureId + "/images/computer/full/" + arr[x - 1]
              }
            });
            return;
          }
        }
      }
    );
  };
}

