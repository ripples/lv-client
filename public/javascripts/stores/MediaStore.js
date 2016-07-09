"use strict";

import EventEmitter from "events";
import {binarySearch, getMaxThumbs, getMaxBuffer} from "../utils/syncUtil";
import * as Immutable from "immutable";

import appDispatcher from "../dispatcher/AppDispatcher";
import MediaConstants, {IMAGE_TYPES} from "../constants/MediaConstants";

const CHANGE_EVENT = "change";

class MediaStore extends EventEmitter {
  constructor() {
    super();
    this._media = Immutable.fromJS({
      current: {
        whiteboard: [],
        computer: []
      },
      lecture: {
        semester: "",
        courseId: "",
        name: "",
        timestamp: 0
      },
      urls: {
        video: "",
        whiteboard: [],
        computer: []
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
    const maxThumbs = getMaxThumbs();
    this._media = this._media.set("current", Immutable.fromJS({
      whiteboard: this._indexToValueMap(images.whiteboard.slice(0, maxThumbs)),
      computer: this._indexToValueMap(images.computer.slice(0, maxThumbs))
    }));
    this._media = this._media.set("lecture", Immutable.Map({
      semester: lecture.semester,
      courseId: lecture.courseId,
      name: lecture.name,
      timestamp: lecture.timestamp
    }));
    this._media = this._media.set("urls", Immutable.Map({
      video: mediaBlobs.video,
      whiteboard: [mediaBlobs.whiteboard],
      computer: [mediaBlobs.computer]
    }));
    this._media = this._media.set("images", Immutable.Map({
      whiteboard: Immutable.List(images.whiteboard),
      computer: Immutable.List(images.computer)
    }));
  }

  /**
   * Returns an object with the index of the list entries
   * mapped to the list entries
   * @param {Array<*>} list - list to map
   * @return {Object} - mapped object
   * @private
   */
  _indexToValueMap(list) {
    return list.reduce((object, item, i) => {
      object[i] = item;
      return object;
    }, {});
  }

  /**
   * Syncs media if needed
   * @param {Number} videoTimestamp - timestamp of video to sync media against video timestamp
   */
  syncMedia(videoTimestamp) {
    IMAGE_TYPES.forEach(mediaType => {
      this._syncIndividualMedia(mediaType, videoTimestamp, getMaxThumbs());
    });
  }

  /**
   * Syncs individual media type against video timestamp
   * @param {String} mediaType - media type to sync
   * @param {Number} videoTimestamp - video timestamp to sync against
   * @param {Number} maxThumbs - maximum number of images
   * @private
   */
  _syncIndividualMedia(mediaType, videoTimestamp, maxThumbs) {
    const centerImageIndex = Math.ceil(maxThumbs / 2);
    const images = this._media.getIn(["images", mediaType]).toArray();
    const nextPossibleImageIndex = binarySearch(videoTimestamp, images);

    // Already in sync
    if (centerImageIndex === nextPossibleImageIndex) {
      return;
    }

    const buffer = getMaxBuffer();
    const offset = maxThumbs - centerImageIndex + buffer;
    const startIndex = nextPossibleImageIndex - offset;
    const endIndex = nextPossibleImageIndex + offset;

    const updatedCurrentImages = this._indexToValueMap(images.slice(startIndex, endIndex));
    this._media.setIn("current", mediaType, Immutable.Map(updatedCurrentImages));
  }

  /**
   * Change emitter
   */
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
  getWhiteboardImageUrls() {
    return this._media.getIn(["urls", "whiteboard"]);
  }

  /**
   * Get video data
   * @return {Object} - video data
   */
  getComputerImageUrls() {
    return this._media.getIn(["urls", "computer"]);
  }

  /**
   * Sets urls of media type
   * @param {Array<DOMString>} mediaUrls - list of media urls
   * @param {String} urlType - media type
   */
  setUrls(mediaUrls, urlType) {
    this._media.setIn(["urls", urlType], Immutable.Map(mediaUrls));
  }
}

const mediaStore = new MediaStore();

// Register callback to handle all updates
appDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCH_INITIAL_MEDIA:
      mediaStore.setMedia(action.mediaUrls, action.images, action.lecture);
      break;
    case MediaConstants.SYNC:
      mediaStore.syncMedia(action.videoTimestamp);
      break;
    case MediaConstants.FETCH_CURRENT_IMAGES:
      mediaStore.setUrls(action.imageUrls, action.type);
      break;
    default:
    // no op
  }
  mediaStore.emitChange();
});

export default mediaStore;
