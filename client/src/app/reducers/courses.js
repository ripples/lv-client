"use strict";

import {DefaultState} from "../constants/StateConstants";

const courses = (state = DefaultState.courses, action) => {
  switch (action.type) {
    case "GET_COURSES":
      break;
    default:
      return state;
  }
};

export default courses;
