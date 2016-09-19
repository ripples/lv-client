"use strict";

import EventEmitter from "events";
import {binarySearch, getMaxThumbs, getMaxBuffer} from "../utils/sync";
import * as Immutable from "immutable";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

import appDispatcher from "../dispatcher/AppDispatcher";
import MediaConstants, {IMAGE_TYPES} from "../constants/MediaConstants";
import {deepClone} from "../utils/object";

const CHANGE_EVENT = "change";

/**
 * Interface for fetching current images
 * @param {Array<String>} path - path to images
 * @return {{start: {String}, end: {String}}} - current index of images
 */
function * getImages(path) {
  const current = this._media.getIn(["currentIndex", ...path]);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield current.toObject();
  }
}

class MediaStore extends EventEmitter {
  constructor() {
    super();
    this._media = Immutable.fromJS(this._getStoreStructure());
  }

  /**
   * Current structure of media store
   * @return {Object} - structure of media store
   * @private
   */
  _getStoreStructure() {
    return {
      lecture: {
        semester: "",
        courseId: "",
        name: "",
        timestamp: 0
      },
      urls: {
        video: "",
        whiteboard: {},
        whiteboardThumbs: {},
        computer: {},
        computerThumbs: {}
      },
      currentIndex: {
        whiteboard: {},
        computer: {}
      }
    };
  }

  /**
   * Initializes media store with data
   * @param {Object} mediaBlobs - Object of media blobs
   * @param {Object} images - Object of media data
   * @param {Object} lecture - Object of current lecture info
   */
  initMedia(mediaBlobs, images, lecture) {
    let initializedStore = this._getStoreStructure();
    let urls = initializedStore.urls;

    urls.computer = images.computer;
    urls.computerThumbs = deepClone(images.computer);
    urls.whiteboard = images.whiteboard;
    urls.whiteboardThumbs = deepClone(images.whiteboard);
    urls.video = mediaBlobs.video;
    // Replace all image names with Object{name, url} denoting the url to image if exists
    IMAGE_TYPES.forEach(imageType => {
      let imageTypeIndex = {};
      initializedStore.currentIndex[imageType] = imageTypeIndex;
      Object.keys(mediaBlobs[imageType]).forEach(id => {
        imageTypeIndex[id] = {
          start: 0,
          end: getMaxThumbs()
        };
        Object.keys(mediaBlobs[imageType][id]).forEach(image => {
          let mediaSourceImageNames = initializedStore.urls[`${imageType}Thumbs`][id];
          const imageUrlObject = mediaBlobs[imageType][id];
          const i = mediaSourceImageNames.indexOf(image);
          // TODO: garbage collect url pointers (caching?)
          mediaSourceImageNames[i] = {name: image, url: imageUrlObject[image]};
        });
      });
    });
    initializedStore.lecture = lecture;

    this._media = Immutable.fromJS(initializedStore);
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
    const mediaIndexes = this._media.getIn(["currentIndex", mediaType]);
    const buffer = getMaxBuffer();
    let updatedIndex = {};
    this._media.getIn(["urls", mediaType]).entrySeq().forEach(immutableImages => {
      const images = immutableImages[1].toArray();
      const id = immutableImages[0];
      const currentImageIndexes = mediaIndexes.get(id).toJSON();
      const centerImageIndex = Math.floor((currentImageIndexes.end - currentImageIndexes.start) / 2);
      const nextPossibleImageIndex = binarySearch(videoTimestamp, images);
      // Already in sync
      if (centerImageIndex >= nextPossibleImageIndex) {
        return;
      }

      const offset = maxThumbs - centerImageIndex + buffer;
      const startIndex = Math.max(0, nextPossibleImageIndex - offset);
      const endIndex = nextPossibleImageIndex + offset;
      updatedIndex[id] = Immutable.Map({start: startIndex, end: endIndex});
    });
    this._media = this._media.setIn(["currentIndex", mediaType], Immutable.Map(updatedIndex));
    this.emitChange();
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

  /**
   * Get urls object
   * @return {Object} - video data
   */
  getUrls() {
    return this._media.get("urls").toJSON();
  }

  /**
   * Get current images
   */
  getCurrentIndex() {
    return this._media.get("currentIndex").toJSON();
  }
  /**
   * Sets urls of media type
   * @param {Array<DOMString>} mediaUrls - list of media urls
   * @param {String} path - path to media urls to update
   */
  setUrls(mediaUrls, path) {
    this._media.setIn(["urls", ...path], Immutable.Map(mediaUrls));
  }
}

const mediaStore = new MediaStore();

// Register callback to handle all updates
appDispatcher.register(action => {
  switch (action.actionType) {
    case MediaConstants.FETCH_INITIAL_MEDIA:
      mediaStore.initMedia(action.mediaUrls, action.images, action.lecture);
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
