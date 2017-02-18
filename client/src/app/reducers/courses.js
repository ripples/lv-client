"use strict";

import {DefaultState} from "../constants/StateConstants";

// TODO propper diffing...
const courses = (state = DefaultState.courses, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return state;
      // break;
    case "GET_COURSES_FULFILLED":
      return [
        ...state, ...action.payload.map(e => {
          return {
            id: e.id,
            title: e.id,
            lectures: [e.lectures].concat("testlecture100")
          };
        })
      ];
      // break;
    default:
      return state;
  }
};

export default courses;
