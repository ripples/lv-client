"use strict";

/**
 * Service layer for interaction with server API
 **/
import {camelizeKeys} from "humps";
import loginStore from "./stores/LoginStore";
import {IMAGE_TYPES} from "./constants/MediaConstants";

const API_VERSION = "v1";
const BASE_URL = `http://${window.location.host}/api/${API_VERSION}`;

/**
 *
 * @param {object} params - parameters to make login request
 * params structured must be:
 * {
 *   data: {
 *     email: string
 *     password: string
 *   },
 *   success: function
 * }
 */
export function login(params) {
  const url = `${BASE_URL}/login`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(params.data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  makeRequest(request, undefined, params.callback);
}

/**
 *
 * @param {object} params - parameters to make fetch course request
 * params structured must be:
 * {
 *   callback: function
 * }
 */
export function fetchCourses(params) {
  const url = `${BASE_URL}/courses`;
  const request = new Request(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  makeRequest(request, undefined, params.callback);
}

/**
 * Fetch given lectures data for course
 * @param {String} semester - semester
 * @param {String} courseId - course id
 * @param {Array<String>} lectures - lectures data will be fetched for
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function fetchLectures(semester, courseId, lectures, callback) {
  const url = `${BASE_URL}/courses/${semester}/${courseId}`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify({
      lectures: lectures
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  makeRequest(request, undefined, callback);
}

/**
 * Fetch video, list of images, and the first image thumbs (If exists)
 * @param {String} semester - semester
 * @param {String} courseId - course id
 * @param {String} lectureName - lecture name
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function fetchInitialMedia(semester, courseId, lectureName, callback) {
  const baseUrl = `${BASE_URL}/media/${semester}/${courseId}/${lectureName}`;

  /**
   * TODO: Current fetch model:
   * Fully synchronous: (video & image data) -> callback (video & raw image & image data)
   * We want:
   * Partially synchronous: callback1 (video, (image data)  -> callback2 (raw image))
   *                                   video shouldn't wait on image data
   **/
  const promises = ["video", "images"].map(location => {
    return new Promise((resolve, reject) => {
      const request = new Request(`${baseUrl}/${location}`, {
        method: "GET"
      });
      makeRequest(request, undefined, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });

  Promise.all(promises).then(promiseResult1 => {
    const images = promiseResult1[1];

    const promises = IMAGE_TYPES.reduce((currentPromises, imageType) => {
      // No need to check for images that don't exist
      const media = images[imageType];
      if (media.length > 0) {
        currentPromises.push(new Promise((resolve, reject) => {
          const request = new Request(`${baseUrl}/images/${imageType}/thumb/${media[0]}`, {
            method: "GET"
          });
          makeRequest(request, undefined, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }));
      }
      return currentPromises;
    }, []);

    Promise.all(promises).then(promiseResult2 => {
      callback(null, {
        mediaUrls: {
          video: promiseResult1[0],
          whiteboard: promiseResult2[1],
          computer: promiseResult2[1]
        },
        images: images,
        lecture: {
          semester: semester,
          courseId: courseId,
          name: lectureName
        }
      });
    }).catch(reason => {
      callback(reason);
    });
  }).catch(reason => {
    callback(reason);
  });
}

/**
 * Fetch list of images
 * @param {String} semester - semester
 * @param {String} courseId - course id
 * @param {String} lectureName - lecture name
 * @param {Array<String>} images - list of images
 * @param {String} imageType - type of image
 * @param {String} size - image size
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function fetchImages(semester, courseId, lectureName, images, imageType, size, callback) {
  const baseUrl = `${BASE_URL}/media/${semester}/${courseId}/${lectureName}/images/${imageType}/${size}`;
  const promises = images.map(imageName => {
    return new Promise((resolve, reject) => {
      const request = new Request(`${baseUrl}/${imageName}`, {
        method: "GET"
      });
      makeRequest(request, undefined, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });
  Promise.all(promises).then(values => {
    callback(null, values);
  }).catch(reason => {
    callback(reason);
  });
}

/**
 *
 * @param {Object} params - params to make the search request
 * params structure:
 * {
 *    searchContent :string,
 *    callback: function
 * }
 */
export function fetchSearchResults(params) {
  const url = `${BASE_URL}/courses/search`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify({
      searchContent: params.searchContent
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  makeRequest(request, undefined, params.callback);
}

/**
 * Wrapper function for fetch API, used to make requests to server
 * @param {Request} request - Request object used with fetch
 * @param {Schema} schema - Normalizr schema
 * @param {Function} callback - Called on success or error returns (err, result)
 */
function makeRequest(request, schema, callback) {
  if (loginStore.isLoggedIn()) {
    request.headers.set("Authorization", loginStore.getJWT());
  }
  let contentType = "";
  fetch(request).then(response => {
    const status = response.status;
    if (status < 200 || status >= 306) {
      callback({err: new Error(response.statusText), status: response.status});
      return;
    }
    contentType = response.headers.get("Content-Type").split(";")[0];
    switch (contentType) {
      case "application/json":
        return response.json();
      case "video/mp4":
        return response.blob();
      case "image/png":
        return response.blob();
      default:
        return response.text();
    }
  }).then(data => {
    switch (contentType) {
      case "application/javascript":
        callback(null, camelizeKeys(data));
        break;
      case "video/mp4":
        callback(null, URL.createObjectURL(data));
        break;
      case "image/png":
        callback(null, URL.createObjectURL(data));
        break;
      default:
        callback(null, data);
    }
  }).catch(err => {
    callback(err);
  });
}

