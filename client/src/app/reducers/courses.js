"use strict";

import {DefaultState} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  let newState;
  switch (action.type) {
    case "GET_COURSES":
      return state;

    case "GET_COURSES_FULFILLED":
      newState = {...DefaultState.courses};
      Object.keys(action.payload).forEach(key => {
        let course = action.payload[key];
        newState[course.id] = {...course, title: course.id};
      });
      return newState;

    case "GET_LECTURE_IMAGES":
      newState = {...state};
      if (Object.keys(newState).length > 0) {
        newState[action.payload.lecture.courseId].lectures[action.payload.lecture.lectureId].images = action.payload.images;
      }
      return newState;

    case "UPDATE_CURRENT_IMAGES":
      newState = {...state};
      if (Object.keys(newState).length > 0) {
        const lecture = action.payload.lecture;
        newState[lecture.courseId].lectures[lecture.lectureId].currentImages = action.payload.newImages;
      }
      return newState;
    default:
      return state;
  }
};

export default courses;
