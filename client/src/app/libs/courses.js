"use strict";

import axios from "axios";

/**
 * Gets basic courses information for users
 * @return {Promise} - promise containing `/courses` data
 */
export function getCourses() {
  return axios.get("/courses");
}
