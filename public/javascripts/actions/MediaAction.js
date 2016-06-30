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
   * @param {String} semester - semester to fetch media for
   * @param {String} courseId - course id to fetch media for
   * @param {String} lectureName - lecture to fetch media for
   */
  fetch(semester, courseId, lectureName) {
    fetchMedia(semester, courseId, lectureName, (err, result) => {
      if (err) {
        //TODO: error handler
        throw err;
      }
      AppDispatcher.dispatch({
        actionType: MediaConstants.FETCH_MEDIA,
        media: result,
        semester: semester,
        courseId: courseId,
        lectureName: lectureName
      });
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
