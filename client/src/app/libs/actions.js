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
 * Action to handle getting lecture images
 * TODO error handling.... .catch( error => {})
 * @param {object} lecture - which lecture to get the images for
 * @return {Function} Function to dispatch the action to the reducer
 */
export function getLectureImagesAction(lecture) {
  return function(dispatch) {
    getImages(lecture.semester, lecture.courseId, lecture.lectureId).then(
      response => {
        dispatch({
          type: "GET_LECTURE_IMAGES",
          payload: {lecture, images: response.data}
        });
      }
    );
  };
}

/**
 * Action to handle initializing computer image
 * TODO error handling.... .catch( error => {})
 * @param {object} lecture - which lecture to init the image for
 * @return {Function} Function to dispatch the action to the reducer
 */
export function initImageAction(lecture) {
  return function(dispatch) {
    dispatch({
      type: "UPDATE_CURRENT_COMPUTER_IMAGE",
      payload: {
        lecture,
        image: ""
      }
    });
  };
}

function getNextImage(lecture, newTimeStamp, images, type) {
  const currentTime = Number(lecture.timestamp) + Number(newTimeStamp);
  let mid;
  let low = 0;
  let high = images.length - 1;

  // Binary search
  while (high - low > 1) {
    mid = Math.floor((high + low) / 2);
    if (Number(images[mid].split("-")[2]) < currentTime) {
      low = mid;
    } else {
      high = mid;
    }
  }

  if (Number(images[low].split("-")[2]) > currentTime) {
    return "";
  }

  return "/media/" + lecture.semester + "/" + lecture.courseId + "/" + lecture.lectureId + "/images/" + type + "/full/" + images[low];
}

/**
 * Action to handle getting lecture image names
 * TODO error handling.... .catch( error => {})
 * @param {object} lecture - lecture object with info
 * @param {number} newTime - new TimeStamp time
 * @return {function} to pass dispatch to
 */
export function updateVideoTimeStampAction(lecture, newTime) {
  return function(dispatch) {
    if (!lecture.images) {
      dispatch(getLectureImagesAction(lecture));
      return;
    }
    let newImages = {
      computer: getNextImage(lecture, newTime, lecture.images.computer[0], "computer"),
      whiteboard: getNextImage(lecture, newTime, lecture.images.whiteboard[0], "whiteboard")
    };
    dispatch({
      type: "UPDATE_CURRENT_IMAGES",
      payload: {
        lecture,
        newImages
      }
    });
  };
}
