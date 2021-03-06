"use strict";

import {combineReducers} from "redux";

import courses from "./courses";
import media from "./media";
import user from "./user";

/**
 * @type {Reducer<S>}
 */
const appReducer = combineReducers({
  courses,
  media,
  user
});

export default appReducer;

