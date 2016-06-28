"use strict";

/*
 * MediaActions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";
import {fetchMedia} from "../API";

class MediaActions {

  /**
   * Fetches media for lecture
   * @param {String} courseId - course id to fetch media for
   * @param {String} lectureName - lecture to fetch media for
   */
  fetch(courseId, lectureName) {
    fetchMedia({
      courseId: courseId,
      lectureName: lectureName,
      callback: (media, err) => {
        if (err) {
          //TODO: error handler
          throw err;
        }
        AppDispatcher.dispatch({
          actionType: MediaConstants.FETCH_MEDIA,
          media: media
        });
      }
    });
  }

  /**
   * Synchronize the current media object for the current timestamp
   * @param  {Date} timestamp - The current time to be viewed
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
