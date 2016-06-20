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
 *
 * @param {Object} params - parameters to make fetch lectures request
 * params structure must be:
 * {
 *   courseId: string,
 *   callback: function
 * }
 */
export function fetchLectures(params) {
  const url = `http://${window.location.host}/api/${API_VERSION}/courses/${params.courseId}`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify({
      lectures: params.lectures
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  makeRequest(request, undefined, params.callback);
}

/**
 *
 * @param {Object} params - parameters to make fetch media request
 * params structure must be:
 * {
 *   courseId: string,
 *   lectureName: string,
 *   callback: function
 * }
 */
export function fetchMedia(params) {
  const url = `http://${window.location.host}/api/${API_VERSION}/courses/${params.courseId}/${params.lectureName}`;
  const request = new Request(url, {
    method: "GET"
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
  fetch(request).then(response => {
    const status = response.status;
    if (status < 200 && status >= 300) {
      callback(new Error(response.statusText));
    }
    return response.json();
  }).then(json => {
    let result = camelizeKeys(json);
    // if (typeof schema !== "undefined") {
    //   result = normalize(result, schema);
    // }
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
}

