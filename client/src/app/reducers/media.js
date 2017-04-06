"use strict";

import {DefaultState} from "../constants/StateConstants";

const media = (state = DefaultState.media, action) => {
  let newState;
  switch (action.type) {
    case "CLEAR_VIDEO_TIME":
      newState = {...state};
      newState.newVideoTime = null;
      return newState;

    case "UPDATE_VIDEO_TIME":
      newState = {...state};
      newState.newVideoTime = action.payload.newTime;
      return newState;

    case "GET_IMAGE_NAMES":
      newState = {...state};
      newState.imageNames = action.payload.imageNames;
      return newState;

    case "UPDATE_CURRENT_IMAGES":
      newState = {...state};
      newState.currentImages = action.payload.newImages;
      return newState;

    default:
      return state;
  }
};

export default media;
