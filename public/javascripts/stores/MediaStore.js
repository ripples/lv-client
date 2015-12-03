/*
 * MediaStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MediaConstants = require('../constants/MediaConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _media = [];
var _current = [];
var _hoptime = NaN;
var _primary = NaN;
var _timestamp = NaN;

/**
 * Create the media array, current array, current timestamp, and primary media
 * @param  {array} media The array of media objects
 */
function set(media) {
  _media = media;
  _primary = 0;
  _timestamp = 0;
  _hoptime = calcHoptime(media);

  _current = [];
  for(obj of media) {
    switch(obj.type) {
      case 'video':
        _current.push(obj);
        break;
      case 'images':
        _current.push({
          type: obj.type,
          data: {
            id: obj.data.id,
            timestamp: obj.data.timestamps[0]
          }
        });
        break;
    }
  }
}

/**
 * Calculate the interval for syncronization
 * @param  {array} media The media object in question
 */
function calcHoptime(media) {
  //TODO
  return 20;
}

/**
 * Update the current media array based on a given timestamp
 * @param  {Date} timestamp The current time to be viewed
 */
function syncronize(timestamp) {
  _current = _current.map(function(obj, index, thisArray){
    console.debug('-----------------');
    console.debug(obj);
    switch(obj.type) {
      case "video":
      console.debug('-----------');
        return obj;
      case "images":
        var idx = -1;
        _media[index].data.timestamps.map(function(mediaTimestamp, mediaIndex, mediaArray){
          if ((Number(timestamp) - Number(mediaTimestamp) < Number(timestamp) - Number(obj.data.timestamp))&&(
                Number(timestamp)- Number(mediaTimestamp) >= 0))
              idx = mediaIndex;
        });
        console.debug('index found' , idx);
        console.debug('current Index' , obj.data.timestamp);
        if (idx !== -1)
          obj.data.timestamp = _media[index].data.timestamps[idx];
          console.debug('-----------');
        return obj;
        default:
        break;
    }
  });
  _timestamp = timestamp;
}


var MediaStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the current media array
   * @return {array}
   */
  getCurrent: function() {
    return _current;
  },

  /**
   * Get the time interval to syncronize with the store
   * @return {array}
   */
  getHoptime: function() {
    return _hoptime;
  },

  /**
   * Get the top media object
   * @return {array}
   */
  getPrimary: function() {
    return _primary;
  },

  /**
   * Check if we need to syncronize
   * @param  {Date} timestamp The current time to be viewed
   * @return {array}
   */
  shouldSync: function(timestamp) {
    return true;  //TODO for each object in the current media array,
                  //check against media array to see if there is a more appropriate timestamp
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case MediaConstants.FETCHMEDIA:
      var media = action.media;
      set(media);
      MediaStore.emitChange();
      break;

    case MediaConstants.SYNC:
      var timestamp = action.timestamp;
      syncronize(timestamp);
      MediaStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = MediaStore;
