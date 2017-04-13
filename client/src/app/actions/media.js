"use strict";

import {getImages} from "../libs/media";
import {ImageFile, binarySearch} from "../utils/media";
import {NO_IMAGE_FOUND} from "../constants/ResourceConstants";
import {BASE_URL} from "../constants/ApiConstants";

/**
 * Gets images names
 * @param {String} courseId - current course id
 * @param {String} lectureId - current lecture id
 * @return {Function} Function to dispatch the action to the reducer
 */
export function getImageNames(courseId, lectureId) {
  return (dispatch, getState) => {
    const semester = getState().courses[courseId].semester;

    return getImages(semester, courseId, lectureId).then(response => {
      return dispatch({
        type: "GET_IMAGE_NAMES",
        payload: {
          imageNames: response.data
        }
      });
    });
  };
}

/**
 * Initializes store for new lecture
 *  - Initializes media store with new images
 *  - Resets video time
 * TODO error handling.... .catch( error => {})
 * @param {String} courseId - current course id
 * @param {String} lectureId - current lecture id
 * @return {Function} Function to dispatch the action to the reducer
 */
export function initLectureData(courseId, lectureId) {
  return dispatch => {
    return dispatch(getImageNames(courseId, lectureId)).then(() => {
      return dispatch(getNextImageNames(courseId, lectureId, 0));
    }).then(() => {
      return dispatch({
        type: "CLEAR_VIDEO_TIME"
      });
    });
  };
}

/**
 * Updates the current video time
 * @param {String | Number} newTime - new TimeStamp time
 * @return {Function} Function to dispatch the action to the reducer
 */
export function updateVideoTime(newTime) {
  return dispatch => {
    return dispatch({
      type: "UPDATE_VIDEO_TIME",
      payload: {
        newTime
      }
    });
  };
}

/**
 * Action to handle getting lecture image names
 * TODO error handling.... .catch( error => {})
 * @param {String} courseId - current course id
 * @param {String} lectureId - current lecture id
 * @param {String | Number} newTime - new TimeStamp time
 * @return {Function} Function to dispatch the action to the reducer
 */
export function getNextImageNames(courseId, lectureId, newTime) {
  return (dispatch, getState) => {
    const store = getState();

    const media = store.media;
    const course = store.courses[courseId];
    const lectureData = course.lectures[lectureId];
    const semester = course.semester;

    const computerImages = media.imageNames.computer[0];
    const whiteboardImages = media.imageNames.whiteboard[0];
    const currentTime = Number(lectureData.timestamp) + Number(newTime);
    return dispatch({
      type: "UPDATE_CURRENT_IMAGES",
      payload: {
        newImages: {
          computer: {
            full: getNextImages(semester, courseId, lectureId, lectureData, currentTime, computerImages, true)[0],
            thumbs: getNextImages(semester, courseId, lectureId, lectureData, currentTime, computerImages, false, 5)
          },
          whiteboard: {
            full: getNextImages(semester, courseId, lectureId, lectureData, currentTime, whiteboardImages, true)[0],
            thumbs: getNextImages(semester, courseId, lectureId, lectureData, currentTime, whiteboardImages, false, 5)
          }
        }
      }
    });
  };
}

/**
 * Gets the next image data based on the current timestamp
 * @param {String} semester - semester id
 * @param {String} courseId - course id
 * @param {String} lectureId - lecture id
 * @param {Object} lectureData - lecture data
 * @param {Number} currentTime - current timestamp of video
 * @param {Array<String>} images - sorted list of image names
 * @param {Boolean} isFullImage - if full image or a thumbnail
 * @param {Number} [count = 1] - number of images to return
 * @return {Array<String>} list of image routes strings
 */
function getNextImages(semester, courseId, lectureId, lectureData, currentTime, images, isFullImage, count = 1) {
  const nextImageIndex = binarySearch(images, currentTime, (fileName, time) => {
    return new ImageFile(fileName).timestamp < time;
  });
  const nextImages = images.slice(nextImageIndex, nextImageIndex + count);
  const imageSize = isFullImage ? "full" : "thumb";
  return nextImages.map(imageName => {
    const image = new ImageFile(imageName);
    if (isFullImage && image.timestamp > currentTime) {
      return {
        src: NO_IMAGE_FOUND,
        timestamp: 0,
        index: 0
      };
    }
    return {
      src: `${BASE_URL}/media/${semester}/${courseId}/${lectureId}/images/${image.type}/${imageSize}/${image.name}`,
      timestamp: image.timestamp - Number(lectureData.timestamp),
      index: nextImageIndex
    };
  });
}
