"use strict";

import EventEmitter from "events";
import binarySearch from "../utils/binarySearchClosest";
import * as Immutable from "immutable";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {MediaConstants} from "../constants/MediaConstants";

const CHANGE_EVENT = "change";

class MediaStore extends EventEmitter {
  constructor() {
    super();
    this._media = Immutable.fromJS({
      currentTime: {
        whiteboard: 0,
        computer: 0
      },
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
   * @param {Object} mediaBlobs - Object of media blobs
   * @param {Object} images - Object of media data
   * @param {Object} lecture - Object of current lecture info
   */
  setMedia(mediaBlobs, images, lecture) {
    // TODO: cleanup
    this._media = this._media.set("lecture", Immutable.Map({
      semester: lecture.semester,
      courseId: lecture.courseId,
      name: lecture.name
    }));
    this._media = this._media.set("urls", Immutable.Map({
      video: mediaBlobs.video,
      whiteboard: mediaBlobs.whiteboard,
      computer: mediaBlobs.computer
    }));
    this._media = this._media.set("images", {
      whiteboard: Immutable.List(images.whiteboard),
      computer: Immutable.List(images.computer)
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
  getWhiteboardImageUrl() {
    return this._media.getIn(["urls", "whiteboard"]);
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getComputerImageUrl() {
    return this._media.getIn(["urls", "computer"]);
  }

  getClosestWhiteBoardImage() {

    binarySearch()
  }
}

const mediaStore = new MediaStore();

// Register callback to handle all updates
AppDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCH_MEDIA:
    {
      mediaStore.setMedia(action.mediaBlobs, action.images, action.lecture);
      mediaStore.emitChange();
      break;
    }
    case MediaConstants.SYNC:
    {
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
