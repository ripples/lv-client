/*
 * MediaActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MediaConstants = require('../constants/MediaConstants');
var api = require('../API.js');

var MediaActions = {

  /**
   * Create the media array
   */
  fetch: function() {
    api.fetchMedia({
      success : function(media){
        AppDispatcher.dispatch({
          actionType: MediaConstants.FETCH,
          media: media
        });
      }
    });
  },

  /**
   * Syncronize the current media object for the current timestamp
   * @param  {Date} timestamp The current time to be viewed
   */
  sync: function(timestamp) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.SYNC,
      timestamp: timestamp
    });
  }

};

module.exports = MediaActions;
