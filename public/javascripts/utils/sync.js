"use strict";

// Pixels
import {THUMBNAIL_SIZE} from "../constants/MediaConstants";

/**
 * Calculates the maximum number of thumbnails to display not including buffer.
 * Guaranteed to be odd
 * @return {Number} - max number of thumbs
 */
export function getMaxThumbs() {
  return Math.floor(window.innerWidth / THUMBNAIL_SIZE);
}

// TODO implement
/**
 * Calculates the maximum buffer size based on the video loading speed.
 * @return {Number} - max buffer size
 */
export function getMaxBuffer() {
  return 5;
}

// TODO introduce range errors
/**
 * Binary searches list for closest number rounded up
 * {@link http://stackoverflow.com/a/8584940}
 * @param {Number} num - number to fine
 * @param {Array<String>|Array<Number>} arr - list to search through
 * @return {String|Number} - index of closest match
 */
export function binarySearch(num, arr) {
  let mid;
  let lo = 0;
  let hi = arr.length - 1;
  while (hi - lo > 1) {
    mid = Math.floor((hi + lo) / 2);
    if (Number(arr[mid].split("-")[2]) < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return hi;
}
