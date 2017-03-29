"use strict";

import {DefaultState} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return state;
      // break;
    case "GET_COURSES_FULFILLED":
      let neState = {...DefaultState.courses};
      Object.keys(action.payload).forEach(key => {
        let course = action.payload[key];
        neState[course.id] = {...course, title: course.id};
      });
      return neState;
      // break;
    case "GET_LECTURE_IMAGES":
      let newState = {...state};
      if (Object.keys(newState).length > 0) {
        newState[action.payload.lecture.courseId].lectures[action.payload.lecture.lectureId].images = action.payload.images;
      }
      return newState;
    case "UPDATE_CURRENT_IMAGES":
      let nState = {...state};
      if (Object.keys(nState).length > 0) {
        nState[action.payload.lecture.courseId].lectures[action.payload.lecture.lectureId].currentImages = action.payload.newImages;
      }
      return nState;
    default:
      return state;
  }
};

export default courses;
