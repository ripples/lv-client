"use strict";

import {combineReducers} from "redux";

import courses from "./courses";
import lectures from "./lectures";
import media from "./media";
import user from "./user";

/**
 * @type {Redux.Reducer<S>}
 */
const appReducer = combineReducers({
  courses,
  lectures,
  media,
  user
});

export default appReducer;

