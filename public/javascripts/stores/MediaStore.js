"use strict";

/*
 * MediaStore
 */

import EventEmitter from "events";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";

const CHANGE_EVENT = "change";

let _media = [];
let _current = [];
let _hoptime = NaN;
let _primary = NaN;
let _timestamp = NaN;

/**
 * Create the media array, current array, current timestamp, and primary media
 * @param  {array} media The array of media objects
 */
function set(media) {
  _media = media;
  _primary = 0;
  _timestamp = 0;
  _hoptime = calcHopTime(media);

  _current = [];
  for (let obj of media) {
    switch (obj.type) {
      case "video":
        _current.push(obj);
        break;
      case "images":
        _current.push({
          type: obj.type,
          data: {
            id: obj.data.id,
            timestamp: obj.data.timestamps[0]
          }
        });
        break;
      default:
        // no op
    }
  }
}

/**
 * Calculate the interval for syncronization
 * @param  {array} media The media object in question
 * @return {number} interval
 */
function calcHopTime(media) {
  // TODO
  return 20;
}

function isApproximateImage(timestamp, mediaTimestamp, obj) {
  return (Number(timestamp) - Number(mediaTimestamp) < Number(timestamp) - Number(obj.data.timestamp))
    && (Number(timestamp) - Number(mediaTimestamp) >= 0);
}
/**
 * Update the current media array based on a given timestamp
 * @param  {Date} timestamp The current time to be viewed
 */
function synchronize(timestamp) {
  _current = _current.map((obj, index) => {
    switch (obj.type) {
      case "video":
        return obj;
      case "images": {
        let idx = -1;
        _media[index].data.timestamps.forEach((mediaTimestamp, mediaIndex) => {
          if (isApproximateImage(timestamp, mediaTimestamp, obj)) {
            idx = mediaIndex;
          }
        });
        if (idx !== -1) {
          obj.data.timestamp = _media[index].data.timestamps[idx];
        }
        return obj;
      }
      default:
        return obj;
    }
  });
  _timestamp = timestamp;
}

class MediaStore extends EventEmitter {
  /**
   * Get the current media array
   * @return {array} - current media array
   */
  getCurrent() {
    return _current;
  }
  /**
   * Get the time interval to syncronize with the store
   * @return {number} - time interval
   */
  getHoptime() {
    return _hoptime;
  }

  /**
   * Get the top media object
   * @return {array} - top media object
   */
  getPrimary() {
    return _primary;
  }
  /**
   * Check if we need to syncronize
   * @param  {number} timestamp The current time to be viewed
   * @return {boolean} - if need to sync
   */
  shouldSync(timestamp) {
    // TODO for each object in the current media array check against media array to see if there is a more appropriate timestamp
    return true;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback - called on event change
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback - to be removed from event
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

const mediaStore = new MediaStore();

// Register callback to handle all updates
AppDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCHMEDIA: {
      const media = action.media;
      set(media);
      mediaStore.emitChange();
      break;
    }
    case MediaConstants.SYNC: {
      const timestamp = action.timestamp;
      synchronize(timestamp);
      mediaStore.emitChange();
      break;
    }
    default:
      // no op
  }
});

export default mediaStore;
