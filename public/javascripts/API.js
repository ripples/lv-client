"use strict";

/**
  * Service layer for interaction with server API
**/

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
  makeRequest(request, params.callback);
}

/**
 *
 * @param {object} params - parameters to make fetch lectures request
 * params structured must be:
 * {
 *   data: {
 *     email: string
 *     password: string
 *   },
 *   jwt: string,
 *   success: function
 * }
 */
export function fetchLectures(params) {
  const url = `http://${window.location.host}/api/${API_VERSION}/lectures`;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(params.data),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": params.jwt
    })
  });
  makeRequest(request, params.callback);
}

export function fetchMedia(params) {

}

/**
 * Wrapper function for fetch API, used to make requests to server
 * @param {Request} request - Request object used with fetch
 * @param {function} callback - Called on success or error returns (err, result)
 */
function makeRequest(request, callback) {
  fetch(request).then(response => {
    const status = response.status;
    if (status < 200 && status >= 300) {
      callback(new Error(response.statusText));
    }
    return response.json();
  }).then(json => {
    callback(null, json);
  }).catch(err => {
    callback(err);
  });
}

