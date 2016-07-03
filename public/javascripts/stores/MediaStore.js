"use strict";

import EventEmitter from "events";

import * as Immutable from "immutable";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";

const CHANGE_EVENT = "change";

/**
 * Iterator for images
 * @param {Array<String>} images - list of images
 * @yield {String} - generator for image iteration
 */
function * imageIterator(images) {
  for (let image of images) {
    yield image;
  }
}

class MediaStore extends EventEmitter {
  constructor() {
    super();
    this._media = Immutable.fromJS({
      lecture: {
        semester: "",
        courseId: "",
        name: ""
      },
      urls: {
        video: "",
        whiteboard: "",
        computer: ""
      },
      images: {
        whiteboard: [],
        computer: []
      }
    });
  }

  /**
   * Set media store data
   * @param {URL} videoUrl - Url of video
   * @param {Object} images - Object of media data
   * @param {Object} lecture - Object of current lecture info
   */
  setMedia(videoUrl, images, lecture) {
    // TODO: cleanup
    this._media = this._media.updateIn(["urls", "video"], () => videoUrl);
    this._media = this._media.updateIn(["images", "whiteboard"], () => images.whiteboard);
    this._media = this._media.updateIn(["images", "computer"], () => images.computer);
    this._media = this._media.set("lecture", {
      semester: lecture.semester,
      courseId: lecture.courseId,
      name: lecture.lectureName
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {Function} callback - called on event change
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {Function} callback - to be removed from event
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getInfo() {
    return this._media.get("info").toJSON();
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getVideoUrl() {
    return this._media.getIn(["urls", "video"]);
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getWhiteboardUrl() {
    return this._media.getIn(["urls", "whiteboard"]);
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getComputerUrl() {
    return this._media.getIn(["urls", "computer"]);
  }

  /**
   * Get generator for whiteboard images
   * @return {Generator} - whiteboard generator
   */
  getWhiteboardImagesIterator() {
    return imageIterator(this._media.getIn(["images", "whiteboard"]));
  }

  /**
   * Get generator for computer images
   * @return {Generator} - computer generator
   */
  getComputerImagesIterator() {
    return imageIterator(this._media.getIn(["images", "computer"]));
  }

}

const mediaStore = new MediaStore();

// Register callback to handle all updates
AppDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCH_MEDIA: {
      mediaStore.setMedia(action.video, action.images, action.lecture);
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
