"use strict";

import EventEmitter from "events";
import * as Immutable from "immutable";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";

const CHANGE_EVENT = "change";

/**
 * Iterator for images
 * @param {Array<String>} images - list of images
 * @return {Generator} - generator for image iteration
 */
function* imageIterator(images) {
  images.forEach(image => {
    yield image;
  });
}


class MediaStore extends EventEmitter {
  /**
   * Set media store data
   * @param {Object} media - Object of media objects
   * @param {String} semester - semester
   * @param {String} courseId - course id
   * @param {String} lectureName - lecture name
   */
  set(media, semester, courseId, lectureName) {
    let _media = {
      course: {
        semester: semester,
        courseId: courseId,
        lectureName: lectureName
      },
      video: media.video,
      whiteboardData: media.whiteboard,
      whiteboardImages: media.whiteboard.images,
      computerData: media.computer,
      computerImages: media.computer.images
    };

    // So there isn't unnecessary movement of large sets of data,
    // forced to use imageIterator generator
    delete _media.video.images;
    delete _media.whiteboard.images;

    this._media = Immutable.fromJS(_media);
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

  /**
   * Get current associated course for media data
   * @returns {Object} - current course data
   */
  getCurrentCourse() {
    return this._media.get("course").toJSON();
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getVideoData() {
    return this._media.get("video").toJSON();
  }

  /**
   * Get whiteboard data
   * @return {Object} - whiteboard data
   */
  getWhiteboardData() {
    return this._media.get("whiteboardData").toJSON();
  }

  /**
   * Get Computer data
   * @return {Object} - computer data
   */
  getComputerData() {
    return this._media.get("computerData").toJSON();
  }

  /**
   * Get generator for whiteboard images
   * @return {Generator} - whiteboard generator
   */
  whiteboardImages() {
    return imageIterator(this._media.get("whiteboardImages"));
  }

  /**
   * Get generator for computer images
   * @return {Generator} - computer generator
   */
  computerImages() {
    return imageIterator(this._media.get("computerImages"));
  }

}

const mediaStore = new MediaStore();

// Register callback to handle all updates
AppDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCH_MEDIA: {
      mediaStore.set(action.media, action.semester, action.courseId, action.lectureName);
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
