"use strict";

import {DefaultState} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  let newState;
  switch (action.type) {
    case "GET_COURSES":
      newState = {...DefaultState.courses};
      Object.keys(action.payload).forEach(key => {
        let course = action.payload[key];
        newState[course.id] = {...course};
      });
      return newState;

    default:
      return state;
  }
};

export default courses;
