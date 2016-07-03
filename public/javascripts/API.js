"use strict";

/**
 * Service layer for interaction with server API
 **/
import {camelizeKeys} from "humps";
import loginStore from "./stores/LoginStore";

const API_VERSION = "v1";

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
  const url = `http://${window.location.host}/api/${API_VERSION}/login`;
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
  const url = `http://${window.location.host}/api/${API_VERSION}/courses`;
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
  const url = `http://${window.location.host}/api/${API_VERSION}/courses/${semester}/${courseId}`;
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
 * Fetch video data
 * @param {String} semester - semester
 * @param {String} courseId - course id
 * @param {String} lectureName - lecture name
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function fetchMedia(semester, courseId, lectureName, callback) {
  let promises = [];
  const urls = ["video", "images"].map(location => {
    return `http://${window.location.host}/api/${API_VERSION}/media/${semester}/${courseId}/${lectureName}/${location}`;
  });

  urls.forEach(url => {
    promises.push(new Promise((resolve, reject) => {
      const request = new Request(url, {
        method: "GET"
      });
      makeRequest(request, undefined, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }));
  });

  Promise.all(promises).then(values => {
    callback(null, {
      video: values[0],
      images: values[1],
      lecture: {
        semester: semester,
        courseId: courseId,
        name: lectureName
      }
    });
  }).catch(reason => {
    callback(reason);
  });
}

/**
 * Fetch image data
 * @param {String} semester - semester
 * @param {String} courseId - course id
 * @param {String} lectureName - lecture name
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function fetchImages(semester, courseId, lectureName, callback) {
  const url = `http://${window.location.host}/api/${API_VERSION}/images/${semester}/${courseId}/${lectureName}`;
  const request = new Request(url, {
    method: "GET"
  });
  makeRequest(request, undefined, callback);
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
  const url = `http://${window.location.host}/api/${API_VERSION}/feed/search`;
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
    if (status < 200 && status >= 300) {
      callback({err: new Error(response.statusText), status: response.status});
      return;
    }
    contentType = response.headers.get("Content-Type").split(";")[0];
    switch (contentType) {
      case "application/json":
      {
        return response.json();
      }
      case "video/mp4":
      {
        return response.blob();
      }
      default :
      {
        return response.text();
      }
    }
  }).then(data => {
    switch (contentType) {
      case "application/javascript":
      {
        const result = camelizeKeys(data);
        callback(null, result);
        break;
      }
      case "video/mp4":
      {
        callback(null, URL.createObjectURL(data));
        break;
      }
      default:
      {
        callback(null, data);
      }
    }
  }).catch(err => {
    callback(err);
  });
}

