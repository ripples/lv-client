"use strict";

import {camelizeKeys} from "humps";
import axios from "axios";

import {BASE_URL} from "../constants/ApiConstants";

/**
 * Configure axios globals
 */
export function configureAxios() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.responseType = "json";
  axios.defaults.transformResponse = data => camelizeKeys(data);
}
