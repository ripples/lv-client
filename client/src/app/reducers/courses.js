"use strict";

import {DefaultState} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return state;
      // break;
    case "GET_COURSES_FULFILLED":
      return [
        // TODO remove the DefaultState.Courses, I only have it appear so that
        // things render if data is not hooked in right. Also rm testlecture100
        ...DefaultState.courses, ...action.payload.map(e => {
          return {
            id: e.id,
            title: e.id,
            lectures: e.lectures
          };
        })
      ];
      // break;
    case "GET_LECTURE_IMAGES":
      let newState = [...state];
      if (newState.length > 0) {
        newState.find(course => course.id === action.payload.lecture.courseId).lectures[action.payload.lecture.lectureId].images = action.payload.images;
      }
      return newState;
    case "UPDATE_CURRENT_LECTURE_IMAGE":
      let nState = [...state];
      if (nState.length > 0) {
        nState.find(course => course.id === action.payload.lecture.courseId).lectures[action.payload.lecture.lectureId].currentComputerImage = action.payload.image;
      }
      return nState;
    default:
      return state;
  }
};

export default courses;
