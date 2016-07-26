"use strict";

/*
 * MediaActions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";
import {fetchMedia} from "../API";

class MediaActions {

  /**
   * Fetch initial media data for lecture which consists of video url, info and list of images
   * @param {String} semester - semester
   * @param {String} courseId - course id
   * @param {String} lectureName - lecture name
   */
  fetch(semester, courseId, lectureName) {
    fetchMedia(semester, courseId, lectureName, (err, result) => {
      if (err) {
        //TODO: error handler
        throw err;
      }
      AppDispatcher.dispatch(Object.assign(result, {
        actionType: MediaConstants.FETCH_MEDIA
      }));
    });
  }

  /**
   * Synchronize the current media object for the current timestamp
   * @param {Number} timestamp - The current time to be viewed
   */
  sync(timestamp) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.SYNC,
      timestamp: timestamp
    });
  }
}

const mediaActions = new MediaActions();

export default mediaActions;
