"use strict";

import moment from "moment";

/**
 * Converts lecture name to readable date string
 * @param {String} date - lecture name produced from capture system
 * @return {String} human readable date string
 */
export function lectureNameToDateString(date) {
  return moment(date, "MM-DD-YYYY--HH-mm-ss").format("MMMM Do YYYY");
}

/**
 * Binary searches array and finds index of value or its closest predecessor
 * @param {Array<*>} arr - array to search
 * @param {*} val - value to find
 * @param {Function} compare - comparator callback that is called (element, value)
 * @return {Number} - index of value or its closest predecessor
 */
export function binarySearch(arr, val, compare) {
  let mid;
  let low = 0;
  let high = arr.length - 1;
  while (high - low > 1) {
    mid = Math.floor((high + low) / 2);
    if (compare(arr[mid], val)) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
}

export class ImageFile {
  constructor(imageName) {
    this.name = imageName;

    const imageData = imageName.split("-");
    this.type = imageData[0];
    this.cameraNumber = Number(imageData[1]);
    this.timestamp = Number(imageData[2]);
    this.size = imageData.length > 3 ? "thumb" : "full";
  }
}
