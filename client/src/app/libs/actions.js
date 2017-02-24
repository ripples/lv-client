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

function getNextImage(lecture, images, newTime, dispatch) {
  let currentTime = Number(lecture.timestamp) + Number(newTime);
  for (let x = 1; x < images.length; x++) {
    let imageTime = Number(images[x].split("-")[2]);
    let lastImageTime = Number(images[x - 1].split("-")[2]);
    if (currentTime >= lastImageTime && currentTime < imageTime) {
      let currentImage = lecture.currentComputerImage;
      if (!currentImage || images[x - 1] !== currentImage.substring(currentImage.lastIndexOf("/") + 1, currentImage.length)) {
        dispatch({
          type: "UPDATE_CURRENT_LECTURE_IMAGE",
          payload: {
            lecture,
            image: "/media/F16/" + lecture.courseId + "/" + lecture.lectureId + "/images/computer/full/" + images[x - 1]
          }
        });
        return;
      }
    }
  }
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
    getNextImage(lecture, lecture.images.computer[0], newTime, dispatch);
  };
}

