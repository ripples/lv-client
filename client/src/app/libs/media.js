"use strict";

import axios from "axios";

/**
 * Gets image information for a lecture
 * @param {string} semester - semester
 * @param {string} courseId - course ID
 * @param {string} lectureId - lecture ID
 * @return {Promise} - promise containing `/semester/courseId/lectureName` data
 */
export function getImages(semester, courseId, lectureId) {
  return axios.get("/media/" + semester + "/" + courseId + "/" + lectureId + "/images");
}
