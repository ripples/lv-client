"use strict";

import {getCourses} from "./courses";
import {getInstructorCoursesUsers} from "./instructor";
import {getImages} from "./media";
import {ImageFile, binarySearch} from "../utils/media";

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

export function getUsersForInstructorAction() {
  return function(dispatch) {
    getInstructorCoursesUsers().then(
      response => {
        dispatch({
          type: "GET_STUDENTS_FULFILLED",
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
 * Action to handle initializing ivisible mages by clearing them
 * TODO error handling.... .catch( error => {})
 * @param {object} lecture - which lecture to init the image for
 * @return {function} Function to dispatch the action to the reducer
 */
export function initImageAction(lecture) {
  return function(dispatch) {
    dispatch({
      type: "UPDATE_CURRENT_IMAGES",
      payload: {
        lecture,
        newImages: {}
      }
    });
  };
}

/**
 * Action to handle getting lecture image names
 * TODO error handling.... .catch( error => {})
 * @param {object} lecture - lecture object with info
 * @param {String | Number} newTime - new TimeStamp time
 * @return {function} to pass dispatch to
 */
export function updateVideoTimeStampAction(lecture, newTime) {
  return function(dispatch) {
    if (!lecture.images) {
      dispatch(getLectureImagesAction(lecture));
      return;
    }

    const computerImages = lecture.images.computer[0];
    const whiteboardImages = lecture.images.whiteboard[0];
    const currentTime = Number(lecture.timestamp) + Number(newTime);
    dispatch({
      type: "UPDATE_CURRENT_IMAGES",
      payload: {
        lecture,
        newImages: {
          computer: {
            full: getNextImages(lecture, currentTime, computerImages, true)[0].src,
            thumbs: getNextImages(lecture, currentTime, computerImages, false, 5)
          },
          whiteboard: {
            full: getNextImages(lecture, currentTime, whiteboardImages, true)[0].src,
            thumbs: getNextImages(lecture, currentTime, whiteboardImages, false, 5)
          }
        }
      }
    });
  };
}

/**
 * Gets the next images based on the current timestamp
 * @param {Object} lecture - lecture data
 * @param {Number} currentTime - current timestamp of video
 * @param {Array<String>} images - sorted list of image names
 * @param {Boolean} isFullImage - is this a full image or a whiteboard
 * @param {Number} [count = 1] - number of images to return
 * @return {Array<String>} list of image routes strings
 */
function getNextImages(lecture, currentTime, images, isFullImage, count = 1) {
  const nextImageIndex = binarySearch(images, currentTime, (fileName, time) => {
    return new ImageFile(fileName).timestamp < time;
  });
  const nextImages = images.slice(nextImageIndex, nextImageIndex + count);
  let imageSize = isFullImage ? "full" : "thumb";
  return nextImages.map(imageName => {
    const image = new ImageFile(imageName);
    if (count === 1 && image.timestamp > currentTime) {
      return "";
    }
    return {
      src: `/media/${lecture.semester}/${lecture.courseId}/${lecture.lectureId}/images/${imageSize}/${image.name}`,
      timestamp: image.timestamp - Number(lecture.timestamp)
    };
  });
}
