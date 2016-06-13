"use strict";

/**
  * Service layer for interaction with server API
**/

const API_VERSION = "v1";

import camelizeKeys from "humps";
import {normalize} from "normalizr";

import CourseSchema from "./schemas/CourseSchema";
import LectureSchema from "./schemas/LectureSchema";

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
 *   jwt: string,
 *   success: function
 * }
 */
export function fetchCourses(params) {
  const url = `http://${window.location.host}/api/${API_VERSION}/courses`;
  const request = new Request(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": params.jwt
    })
  });
  makeRequest(request, CourseSchema, params.callback);
}

/**
 *
 * @param {object} params - parameters to make fetch lectures request
 * params structured must be:
 * {
 *   courseId: number,
 *   jwt: string,
 *   success: function
 * }
 */
export function fetchLectures(params) {
  const url = `http://${window.location.host}/api/${API_VERSION}/courses/${params.courseId}`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(params.data),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": params.jwt
    })
  });
  makeRequest(request, LectureSchema, params.callback);
}

export function fetchMedia(params) {

}

/**
 * Wrapper function for fetch API, used to make requests to server
 * @param {Request} request - Request object used with fetch
 * @param {Schema} schema - Normalizr schema
 * @param {function} callback - Called on success or error returns (err, result)
 */
function makeRequest(request, schema, callback) {
  fetch(request).then(response => {
    const status = response.status;
    if (status < 200 && status >= 300) {
      callback(new Error(response.statusText));
    }
    return response.json();
  }).then(json => {
    let result = camelizeKeys(json);
    if (typeof schema !== "undefined") {
      result = normalize(result, schema);
    }
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
}

