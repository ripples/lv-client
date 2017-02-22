"use strict";

import {DefaultState} from "../constants/StateConstants";

const media = (state = DefaultState.media, action) => {
  switch (action.type) {
    case "UPDATE_VIDEO_TIMESTAMP":
      return {...state, videoTimeStamp: action.payload.newTime, computerImage: action.payload.image};
    default:
      return state;
  }
};

export default media;
