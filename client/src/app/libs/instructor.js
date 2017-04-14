"use strict";

import axios from "axios";

/**
 * Gets the users in the classes for the Instructor Course Page
 * @return {Promise} - promise containing `/instructor-settings` data
 */
export function getInstructorCoursesUsers() {
  return axios.get("/instructor-settings");
}
