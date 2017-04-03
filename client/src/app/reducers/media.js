"use strict";

import {DefaultState} from "../constants/StateConstants";

const media = (state = DefaultState.media, action) => {
  let newState;
  switch (action.type) {
    case "CLEAR_VIDEO_TIME":
      newState = {...state};
      newState.newVideoTime = undefined;
      return newState;

    case "UPDATE_VIDEO_TIME":
      newState = {...state};
      newState.newVideoTime = action.payload.newTime;
      return newState;

    default:
      return state;
  }
};

export default media;
