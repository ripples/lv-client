"use strict";

/*
 * MediaActions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";
import {fetchMedia} from "../API";

class MediaActions {

  /**
   * Create the media array
   */
  fetch() {
    fetchMedia({
      success: media => {
        AppDispatcher.dispatch({
          actionType: MediaConstants.FETCHMEDIA,
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
