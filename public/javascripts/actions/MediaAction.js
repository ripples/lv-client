/*
 * MediaActions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";
import {fetchMedia} from "../API";

export default class MediaActions {

  /**
   * Create the media array
   */
  static fetch() {
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
  static sync(timestamp) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.SYNC,
      timestamp: timestamp
    });
  }
}
