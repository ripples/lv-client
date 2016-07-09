"use strict";

/*
 * MediaActions
 */

import appDispatcher from "../dispatcher/AppDispatcher";
import MediaConstants from "../constants/MediaConstants";
import {fetchInitialMedia, fetchImages} from "../API";

class MediaActions {

  /**
   * Fetch initial media data for lecture which consists of video url, info and list of images
   * @param {String} semester - semester
   * @param {String} courseId - course id
   * @param {String} lectureName - lecture name
   */
  static fetchInit(semester, courseId, lectureName) {
    fetchInitialMedia(semester, courseId, lectureName, (err, result) => {
      if (err) {
        //TODO: error handler
        throw err;
      }
      appDispatcher.dispatch(Object.assign(result, {
        actionType: MediaConstants.FETCH_INITIAL_MEDIA
      }));
    });
  }

  /**
   * Synchronize the current media object for the current video timestamp
   * @param {Number} videoTimestamp - The current time to be viewed
   */
  static sync(videoTimestamp) {
    appDispatcher.dispatch({
      actionType: MediaConstants.SYNC,
      videoTimestamp: videoTimestamp
    });
  }

  /**
   * Fetches images, does not handle caching
   * @param {String} semester - semester
   * @param {String} courseId - course id
   * @param {String} lectureName - lecture name
   * @param {Array<String>} images - list of images
   * @param {String} imageType - type of image
   * @param {String} size - image size
   */
  static fetchImages(semester, courseId, lectureName, images, imageType, size) {
    fetchImages(semester, courseId, lectureName, images, imageType, size, (err, result) => {
      if (err) {
        //TODO: error handler
        throw err;
      }
      appDispatcher.dispatch({
        actionType: MediaConstants.FETCH_CURRENT_IMAGES,
        imageUrls: result,
        type: imageType
      });
    });
  }
}

export default MediaActions;
