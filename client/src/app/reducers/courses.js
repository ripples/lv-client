"use strict";

import {DefaultState, UserTypesEnum} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  let newState;
  let studentCourses;
  switch (action.type) {
    case "GET_COURSES":
      return state;

    case "GET_COURSES_FULFILLED":
      newState = action.payload;
      return newState;

    case "GET_LECTURE_IMAGES":
      newState = {...state};
      studentCourses = newState[UserTypesEnum.STUDENT];
      if (Object.keys(studentCourses).length > 0) {
        studentCourses[action.payload.lecture.courseId].lectures[action.payload.lecture.lectureId].images = action.payload.images;
      }
      return newState;

    case "UPDATE_CURRENT_IMAGES":
      newState = {...state};
      studentCourses = newState[UserTypesEnum.STUDENT];
      if (Object.keys(studentCourses).length > 0) {
        const lecture = action.payload.lecture;
        studentCourses[lecture.courseId].lectures[lecture.lectureId].currentImages = action.payload.newImages;
      }
      return newState;

    case "GET_STUDENTS_FULFILLED":
      newState = {...state};
      console.log("state", newState);
      console.log("payload", action.payload);
      return newState;

    default:
      return state;
  }
};

export default courses;
