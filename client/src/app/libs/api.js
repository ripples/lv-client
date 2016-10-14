"use strict";

import cookie from "react-cookie";
import {camelizeKeys} from "humps";

import {AUTH_COOKIE} from "../constants/ApiConstants";

/**
 * Wrapper function for fetch API, used to make requests to server
 * @param {Request} request - Request object used with fetch
 * @param {Function} callback - Called on success or error returns (err, result)
 */
export function request(request, callback) {
  const token = cookie.load(AUTH_COOKIE);
  if (token) {
    request.headers.set("Authorization", token);
  }
  let contentType = "";
  fetch(request).then(response => {
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
    if (data.error) {
      callback(data);
      return;
    }
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
